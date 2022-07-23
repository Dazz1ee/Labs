package com.example.demogradle.security;

import com.example.demogradle.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Objects;
import java.util.stream.Collectors;


@AllArgsConstructor
public class UserDetailsImp implements org.springframework.security.core.userdetails.UserDetails {

    private Long id;
    private String username;
    private String email;
    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    private String avatar;

    public static UserDetailsImp build(User user){
            return new UserDetailsImp(user.getId(), user.getUsername(), user.getEmail(), user.getPassword(), user.getRoles().stream().map(role->new SimpleGrantedAuthority(role.getRole())).collect(Collectors.toList()),user.getAvatar());
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }


    public String getAvatar(){
        return avatar;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getEmail(){
        return email;
    }

    public Long getId(){
        return id;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDetailsImp that = (UserDetailsImp) o;
        return Objects.equals(id, that.getId());
    }

    @Override
    public String toString() {
        return "UserDetailsImp{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", authorities=" + authorities +
                ", avatar='" + avatar + '\'' +
                '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, email, password, authorities);
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
