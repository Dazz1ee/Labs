package com.example.demogradle.services;

import com.example.demogradle.entity.Cart;
import com.example.demogradle.entity.Product;
import com.example.demogradle.entity.User;
import com.example.demogradle.repositories.RoleRepo;
import com.example.demogradle.repositories.UserRepo;
import com.example.demogradle.security.UserDetailsImp;
import lombok.AllArgsConstructor;
import lombok.Data;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@AllArgsConstructor
@Data
public class UserService implements UserDetailsService {
    private UserRepo userRepo;
    private RoleRepo roleRepo;

    @Transactional
    public void saveUser(User user){
        userRepo.save(user);
    }

    public Optional<User> findByName(String name){
        return userRepo.findByUsername(name);
    }

    @Transactional
    public void addProduct(User user, Product product){
        Optional<Cart> productOptional = user.getProducts().stream().filter(item -> item.getProduct().equals(product)).findAny();
        if(productOptional.isEmpty()){
            user.getProducts().add(new Cart(user, product));
        } else {
            Cart cart = productOptional.get();
            cart.setAmount(cart.getAmount() + 1);
        }
    }

    @Transactional
    public void deleteProduct(User user, Product product){
        Optional<Cart> productOptional = user.getProducts().stream().filter(item -> item.getProduct().equals(product)).findAny();
        if(productOptional.isEmpty()){
            throw new RuntimeException("Product is not in the cart");
        } else {
            Cart cart = productOptional.get();
            if(cart.getAmount() == 1){
                user.getProducts().remove(cart);
            } else {
                cart.setAmount(cart.getAmount() - 1);
            }
        }
    }

    @Transactional
    public void totalDeleteProduct(User user, Product product){
        Optional<Cart> productOptional = user.getProducts().stream().filter(item -> item.getProduct().equals(product)).findAny();
        if(productOptional.isEmpty()){
            throw new RuntimeException("Product is not in the cart");
        } else {
            user.getProducts().remove(productOptional.get());
        }
    }

    @Transactional
    public void deleteAllProduct(User user){
        user.setProducts(new ArrayList<>());
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userop = findByName(username);
        if(userop.isEmpty()){
            throw new UsernameNotFoundException(username + " not found");
        }
        User user = userop.get();
        return UserDetailsImp.build(user);
    }
}
