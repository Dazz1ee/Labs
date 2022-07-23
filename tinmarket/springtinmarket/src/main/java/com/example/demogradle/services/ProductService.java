package com.example.demogradle.services;

import com.example.demogradle.entity.Product;
import com.example.demogradle.repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    ProductRepo productRepo;

    public Product findById(Long id){
        Optional<Product> product = productRepo.findById(id);
        if(product.isEmpty()){
            throw new RuntimeException("Product not found");
        }
        return product.get();
    }

    public List<Product> getAll(){
        return productRepo.findAll();
    }

}
