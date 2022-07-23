package com.example.demogradle.model;

import com.example.demogradle.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class HomeResponce {
    private Product product;
    private int amount;

    public HomeResponce(Product product, int amount) {
        this.product = product;
        this.amount = amount;
    }
}
