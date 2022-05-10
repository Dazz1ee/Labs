package com.example.shop.entities;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode
public class UserProductId implements Serializable {
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "product_id")
    private Long productId;

}
