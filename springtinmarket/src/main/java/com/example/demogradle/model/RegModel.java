package com.example.demogradle.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class RegModel {
    private String email;
    private String username;
    private String password;
}
