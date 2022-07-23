package com.example.demogradle.services;

import com.example.demogradle.entity.User;
import com.example.demogradle.security.UserDetailsImp;
import com.google.api.client.http.InputStreamContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FileManager {
    //https://drive.google.com/file/d/id/view
    private GoogleDriveManager googleDriveManager;

    public List<File> listEverything() throws IOException, GeneralSecurityException {
        FileList result = googleDriveManager.getInstance().files().list()
                .setPageSize(100)
                .setFields("nextPageToken, files(id, name, mimeType)")
                .setQ("'root' in parents")
                .execute();
        return result.getFiles();
    }

    public void downloadFile(String id, OutputStream outputStream) throws IOException, GeneralSecurityException {
        if (id != null) {
            googleDriveManager.getInstance().files().get(id).executeMediaAndDownloadTo(outputStream);
        }
    }

    public void deleteFile(String fileId) throws Exception {
        googleDriveManager.getInstance().files().delete(fileId).execute();
    }
    @Transactional
    public String  uploadFile(MultipartFile file,User user, String filePath) {
        try {
            String folderId;
            if(filePath != null) {
                folderId = getFolderId(filePath);
            } else {
                folderId = "root";
            }
            if (file != null) {
                File fileMetadata = new File();
                fileMetadata.setParents(Collections.singletonList(folderId));
                fileMetadata.setName(file.getOriginalFilename());
                File uploadFile = googleDriveManager.getInstance()
                        .files()
                        .create(fileMetadata, new InputStreamContent(
                                file.getContentType(),
                                new ByteArrayInputStream(file.getBytes()))
                        )
                        .setFields("id").execute();
                if(user.getAvatar() != null){
                    deleteFile(user.getAvatar());
                }
                user.setAvatar(uploadFile.getId());
                return uploadFile.getId();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    public String getFolderId(String path) throws Exception {
        String parentId = null;
        String[] folderNames = path.split("/");

        Drive driveInstance = googleDriveManager.getInstance();
        for (String name : folderNames) {
            parentId = findOrCreateFolder(parentId, name, driveInstance);
        }
        return parentId;
    }

    private String findOrCreateFolder(String parentId, String folderName, Drive driveInstance) throws Exception {
        String folderId = searchFolderId(parentId, folderName, driveInstance);
        if (folderId != null) {
            return folderId;
        }
        File fileMetadata = new File();
        fileMetadata.setMimeType("application/vnd.google-apps.folder");
        fileMetadata.setName(folderName);

        if (parentId != null) {
            fileMetadata.setParents(Collections.singletonList(parentId));
        }
        return driveInstance.files().create(fileMetadata)
                .setFields("id")
                .execute()
                .getId();
    }

    private String searchFolderId(String parentId, String folderName, Drive service) throws Exception {
        String folderId = null;
        String pageToken = null;
        FileList result = null;

        File fileMetadata = new File();
        fileMetadata.setMimeType("application/vnd.google-apps.folder");
        fileMetadata.setName(folderName);

        do {
            String query = " mimeType = 'application/vnd.google-apps.folder' ";
            if (parentId == null) {
                query = query + " and 'root' in parents";
            } else {
                query = query + " and '" + parentId + "' in parents";
            }
            result = service.files().list().setQ(query)
                    .setSpaces("drive")
                    .setFields("nextPageToken, files(id, name)")
                    .setPageToken(pageToken)
                    .execute();

            for (File file : result.getFiles()) {
                if (file.getName().equalsIgnoreCase(folderName)) {
                    folderId = file.getId();
                }
            }
            pageToken = result.getNextPageToken();
        } while (pageToken != null && folderId == null);

        return folderId;
    }
}
