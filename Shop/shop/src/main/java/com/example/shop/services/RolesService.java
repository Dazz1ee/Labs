package com.example.shop.services;

import com.example.shop.entities.Role;
import com.example.shop.repositories.RoleRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolesService {
    @Autowired
    private RoleRep roleRep;

    public Role getRoleByName(String s){
        return roleRep.findByRoleName(s);
    }
}
