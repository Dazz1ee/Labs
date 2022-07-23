package com.example.demogradle.controllers;

import com.example.demogradle.entity.User;
import com.example.demogradle.security.UserDetailsImp;
import com.example.demogradle.services.FileManager;
import com.example.demogradle.services.UserService;
import com.google.api.services.drive.model.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.http.HttpRequest;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
@CrossOrigin
public class FileController {
    @Autowired
    private UserService userService;

    @Autowired
    private FileManager fileManager;

//    @GetMapping("/")
//    public ResponseEntity<List<File>> listEverything() throws IOException, GeneralSecurityException {
//        List<File> files = fileManager.listEverything();
//        return ResponseEntity.ok(files);
//    }

    @GetMapping("/download/{id}")
    public void downloadAvatar(@PathVariable String id, HttpServletResponse response) throws IOException, GeneralSecurityException {
        fileManager.downloadFile(id, response.getOutputStream());
    }

    @GetMapping("/directory/create")
    public ResponseEntity<String> createDirecory(@RequestParam String path) throws Exception {
        String parentId = fileManager.getFolderId(path);
        return ResponseEntity.ok("parentId: "+parentId);
    }

    @PostMapping(value = "/upload",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE} )
    public ResponseEntity<String> uploadAvatar(@RequestBody MultipartFile file, @RequestParam(required = false) String path) {
        System.out.println(file);
        UserDetailsImp userDetails = (UserDetailsImp) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByName(userDetails.getUsername()).get();
        String fileId = fileManager.uploadFile(file, user, path);
        System.out.println(fileId);
        if(fileId == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok(fileId);
    }


    @GetMapping("/info/delete")
    public void deleteAvatar() throws Exception {
        UserDetailsImp userDetailsImp = (UserDetailsImp) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByName(userDetailsImp.getUsername()).get();
        if(user.getAvatar() == null){
            throw new RuntimeException("User don't have avatar");
        };
        fileManager.deleteFile(user.getAvatar());
        user.setAvatar(null);
    }
    @GetMapping("/info")
        private ResponseEntity<User> info() {
        UserDetailsImp userDetails = (UserDetailsImp) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByName(userDetails.getUsername()).get();
        System.out.println(user.getAvatar() + " " + user.getUsername());
        return ResponseEntity.ok(user);
    }

}
