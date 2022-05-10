package com.example.shop.repositories;

import com.example.shop.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRep extends JpaRepository<Role, Long> {
    public Role findByRoleName(String s);
}
