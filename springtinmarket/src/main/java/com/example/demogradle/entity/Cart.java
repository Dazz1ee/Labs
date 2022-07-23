package com.example.demogradle.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "Cart")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
    @JsonIgnore
    @EmbeddedId
    private CartId cartId;

    @ManyToOne
    @MapsId("productId")
    private Product product;

    @JsonIgnore
    @ManyToOne
    @MapsId("userId")
    private User user;

    @Column(name = "amount")
    private int amount = 1;

    public Cart(User user, Product product){
        cartId = new CartId(product.getId(), user.getId());
        this.user = user;
        this.product = product;
    }
}
