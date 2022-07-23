package com.example.demogradle.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class JWTResponce {
    private String username;
    private String email;
    private Long id;
    private String path;
}
