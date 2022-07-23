package com.example.demogradle.services;

import com.example.demogradle.entity.Role;
import com.example.demogradle.repositories.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {
    @Autowired
    private RoleRepo roleRepo;

    public Role getRoleByName(String role) throws Exception {
        Optional<Role> oprol = roleRepo.findRoleByRole(role);
        if(oprol.isEmpty()){
            throw new Exception("ROle?");
        } else {
            return oprol.get();
        }
    }
}
