package com.example.demogradle.controllers;


import com.example.demogradle.entity.Cart;
import com.example.demogradle.entity.Product;
import com.example.demogradle.entity.User;
import com.example.demogradle.model.CartModel;
import com.example.demogradle.model.HomeResponce;
import com.example.demogradle.security.UserDetailsImp;
import com.example.demogradle.services.ProductService;
import com.example.demogradle.services.UserService;
import org.apache.catalina.connector.Response;
import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class ProductController {
    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;

    private final String unAuthUser = "anonymousUser";

    @GetMapping({"/", "/home"})
    public List<HomeResponce> allProduct (){
        Authentication authentication =  SecurityContextHolder.getContext().getAuthentication();
        if(authentication.getPrincipal().equals(unAuthUser)){
            List<HomeResponce> responce = productService.getAll().stream().map(product -> new HomeResponce(product, 0)).toList();
            return responce;
        } else {
            UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();
            Optional<User> user = userService.findByName(userDetails.getUsername());
            List<Product> cartList = user.get().getProducts().stream().map(cart -> cart.getProduct()).toList();
            List<Product> allProduct = productService.getAll();
            List<HomeResponce> responce =  user.get().getProducts().stream().map(cart -> new HomeResponce(cart.getProduct(),cart.getAmount())).collect(Collectors.toList());
            System.out.println(responce);
            if(responce == null){
                responce= new ArrayList<>();
            }
            for (Product product : allProduct) {
                if(!cartList.contains(product))
                responce.add(new HomeResponce(product, 0));
            }
            responce.sort(new Comparator<HomeResponce>() {
                @Override
                public int compare(HomeResponce o1, HomeResponce o2) {
                    return o1.getProduct().getId().compareTo(o2.getProduct().getId());
                }
            });
            return responce;
        }
    }

    @GetMapping("/cart")
    public List<CartModel> cart(){
        UserDetailsImp userDetails = (UserDetailsImp) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByName(userDetails.getUsername()).get();
        List<CartModel> cartModelList = user.getProducts().stream().map(item -> new CartModel(item.getProduct(), item.getAmount())).toList();
        return cartModelList;
    }

    @GetMapping("/add")
    public ResponseEntity<?> add(@RequestParam Long id){
        Authentication authentication =  SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.getPrincipal());
        UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();
        User user = userService.findByName(userDetails.getUsername()).get();
        Product product = productService.findById(id);
        userService.addProduct(user,product);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/cart/delete")
    public ResponseEntity<?> deleteProduct(@RequestParam Long id){
        UserDetailsImp userDetails = (UserDetailsImp) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByName(userDetails.getUsername()).get();
        Product product = productService.findById(id);
        userService.deleteProduct(user,product);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/cart/totaldelete")
    public ResponseEntity<?> totalDeleteProduct(@RequestParam Long id){
        UserDetailsImp userDetails = (UserDetailsImp) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Product product = productService.findById(id);
        User user = userService.findByName(userDetails.getUsername()).get();
        userService.totalDeleteProduct(user,product);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/cart/deleteall")
    public int deleteAllProduct(){
        UserDetailsImp userDetails = (UserDetailsImp) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByName(userDetails.getUsername()).get();
        userService.deleteAllProduct(user);
        return Response.SC_OK;
    }
}
