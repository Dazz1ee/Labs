package com.example.demogradle.controllers;


import com.example.demogradle.entity.Role;
import com.example.demogradle.entity.User;
import com.example.demogradle.model.AuthModel;
import com.example.demogradle.model.JWTResponce;
import com.example.demogradle.model.RegModel;
//import com.example.demogradle.security.JWTUtil;
import com.example.demogradle.security.JWTUtils;
import com.example.demogradle.security.UserDetailsImp;
import com.example.demogradle.services.RoleService;
import com.example.demogradle.services.UserService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JWTUtils jwtUtils;

    @Autowired
    RoleService roleService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthModel authModel){
        System.out.println(authModel.getPassword() + " " + authModel.getUsername());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(authModel.getUsername(), authModel.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        System.out.println(userDetails);
        ResponseCookie jwt = jwtUtils.generateJWTCookie(userDetails);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwt.toString()).body(new JWTResponce(userDetails.getUsername(), userDetails.getEmail(), userDetails.getId(), userDetails.getAvatar()));
    }

    @PostMapping("/signup")
    public int regUser(@RequestBody RegModel regModel) throws Exception {
        String userpassword = passwordEncoder.encode(regModel.getPassword());
        User user = new User();
        user.setPassword(userpassword);
        user.setUsername(regModel.getUsername());
        user.setEmail(regModel.getEmail());
        Role role = roleService.getRoleByName("ROLE_USER");
        user.setRoles(List.of(role));
        userService.saveUser(user);
        return Response.SC_OK;
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Out succes");
    }
}
