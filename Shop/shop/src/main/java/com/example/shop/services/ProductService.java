package com.example.shop.services;

import com.example.shop.entities.Product;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.shop.repositories.ProductRep;

import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class ProductService {
    @Autowired
    ProductRep productRep;

    public List<Product> viewAll(){
        return productRep.findAll();
    }

    public Page<Product> productsPage(Pageable pageable){
        return productRep.findAll(pageable);
    }

    public Product findById(Long id){
        return productRep.findById(id).orElse(null);
    }
}
