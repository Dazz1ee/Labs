package com.example.shop.models;

import com.example.shop.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartPOJO {
    //private List<Product> username;
    private Product product;
    private Long count;
}
