package com.example.shop.controllers;

import com.example.shop.entities.Role;
import com.example.shop.entities.User;
//import com.example.shop.security.JWTUtil;
import com.example.shop.models.Model;
import com.example.shop.security.JWTUtil;
import com.example.shop.services.RolesService;
import lombok.AllArgsConstructor;
import org.apache.catalina.connector.Response;
import org.hibernate.event.spi.SaveOrUpdateEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.authentication.AuthenticationManagerFactoryBean;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.shop.services.UserService;

import java.util.*;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
@CrossOrigin
public class UserController {

    private  UserService userService;

    private JWTUtil jwtUtil;

    private AuthenticationManager authenticationManager;

    private RolesService rolesService;

    private PasswordEncoder passwordEncoder;

    @PostMapping("/registration")
    public String registration(@RequestBody User user){
            String userpassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(userpassword);
            Role role = rolesService.getRoleByName("ROLE_USER");
        System.out.println("role " + role);
            user.setRoles(List.of(role));
            userService.saveUser(user);
            String token = jwtUtil.generateToken(user.getUsername());
            System.out.println("suc");
            return token;
    }

    @PostMapping("/login")
    public Object login(@RequestBody Model model){
        try {
            System.out.println(model.getName() + " " + model.getPassword());
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(model.getName(), model.getPassword());
            authenticationManager.authenticate(authenticationToken);
            System.out.println("authtoken " + authenticationToken);
            String token = jwtUtil.generateToken(model.getName());
            System.out.println("token " + token);
            return token;
        } catch (AuthenticationException e){
//            return Response.SC_BAD_REQUEST;
            throw new AuthenticationException("Wrong password or login") {
                @Override
                public String getMessage() {
                    return super.getMessage();
                }
            };
//            throw new RuntimeException("Wrong password or login");
        }
    }
}
