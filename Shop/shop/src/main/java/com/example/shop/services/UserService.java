package com.example.shop.services;

import com.example.shop.entities.Role;
import com.example.shop.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.shop.repositories.RoleRep;
import com.example.shop.repositories.UserRep;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRep userRepository;
    @Autowired
    RoleRep roleRepository;

    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public void saveUser(User user){
        userRepository.save(user);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userRep = findByUsername(username);
        if(userRep.isEmpty()){
            throw new UsernameNotFoundException("User not found");
        }
        User user = userRep.get();
        return  new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), mapToRoles(user.getRoles()));
    }
    public Collection<? extends GrantedAuthority> mapToRoles(Collection<Role> roles){
        return roles.stream().map(r-> new SimpleGrantedAuthority(r.getRoleName())).collect(Collectors.toList());
    }
}
