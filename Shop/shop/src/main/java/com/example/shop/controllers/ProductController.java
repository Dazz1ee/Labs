package com.example.shop.controllers;

import com.example.shop.entities.Product;
import com.example.shop.entities.User;
import com.example.shop.entities.UserProduct;
import com.example.shop.models.CartPOJO;
import com.example.shop.models.DeleteProductPOJO;
import com.example.shop.services.UserService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.example.shop.services.ProductService;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class ProductController {
    @Autowired
    ProductService productService;

    @Autowired
    UserService userService;


    @GetMapping("/home")
    public List<Product> homePage(@RequestParam(value = "page", required = false) int page){
        Pageable pageable = PageRequest.of(page, 10);

        List<Product> products = productService.productsPage(pageable).getContent();

        return products;
    }

    @GetMapping("/cart")
    public List<CartPOJO> cart(Principal principal){
        User user = userService.findByUsername(principal.getName()).get();
        List<CartPOJO> productList = user.getUserProducts().stream().map(up->new CartPOJO(up.getProduct(), up.getCount())).collect(Collectors.toList());
        return productList;
    }

    @Transactional
    @PostMapping("/cart/delete")
    public int deleteProduct(@RequestBody DeleteProductPOJO pojo, Principal principal){
        try {
            User user = userService.findByUsername(principal.getName()).get();
            System.out.println(principal.getName());
            UserProduct userProduct = user.getUserProducts().stream().filter(up -> up.getProduct().getId().equals(pojo.getId())).findAny().get();
            if (userProduct.getCount().equals(pojo.getCount())) {
                user.getUserProducts().remove(userProduct);
            } else {
                userProduct.setCount(userProduct.getCount() - pojo.getCount());
            }
            return Response.SC_OK;
        } catch (Exception e){
            System.err.println(e);
            return Response.SC_BAD_REQUEST;
        }
//        if(!(user.isEmpty())) {
//            user.get().getProductList().remove(product);
//        }
    }
    @Transactional
    @GetMapping("/add")
    public int addProduct(@RequestParam(value = "id") Long id, Principal principal){
        System.out.println("ad1");
        User user = userService.findByUsername(principal.getName()).get();
        Product product = productService.findById(id);
        if(user.getUserProducts().stream().anyMatch(p->p.getProduct().equals(product))){
            UserProduct userProduct = user.getUserProducts().stream().filter(p->p.getProduct().equals(product)).findAny().get();
            userProduct.setCount(userProduct.getCount()+1);
            return Response.SC_OK;
        }
        System.out.println("ad");
        user.productAdd(product);
        //System.out.println(user.getProductList());
        return Response.SC_OK;
    }

    @GetMapping
    List<Product> viewProduct(){
        return productService.viewAll();
    }

//    @PostMapping
//    public String addToCart(@RequestBody Product product){
//
//    }

}
