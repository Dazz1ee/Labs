package com.example.demogradle.model;

import com.example.demogradle.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CartModel {
    private Product product;
    private int amount;

}
