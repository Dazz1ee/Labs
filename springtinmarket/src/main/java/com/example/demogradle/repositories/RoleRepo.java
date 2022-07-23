package com.example.demogradle.repositories;

import com.example.demogradle.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
    Optional<Role> findRoleByRole(String role);
}
