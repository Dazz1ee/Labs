package com.example.demogradle.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartId implements Serializable {
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "user_id")
    private Long userId;
}
