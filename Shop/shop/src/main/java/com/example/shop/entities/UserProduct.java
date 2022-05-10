package com.example.shop.entities;

import lombok.*;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;

@Entity
@Table(name = "cart")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode

public class UserProduct {
    @EmbeddedId
    UserProductId id;

    @ManyToOne()
    @MapsId("userId")
    private User user;

    @ManyToOne()
    @MapsId("productId")
    private Product product;

    public UserProduct(User user, Product product) {
        id = new UserProductId(user.getId(), product.getId());
        this.user = user;
        this.product = product;
    }

    @Column(name = "count")
    private Long count = 1L;
}
