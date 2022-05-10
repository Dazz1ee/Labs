package com.example.shop.entities;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Data
@AllArgsConstructor
@EqualsAndHashCode
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Transient
    private String passwordConfirm;

    @Column(name="username")
    private String username;

    @Column(name ="password")
    private String password;

    @ManyToMany
    @JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<UserProduct> userProducts = new ArrayList<>();

    public void productAdd(Product product){
        UserProduct userProduct = new UserProduct(this, product);
        userProducts.add(userProduct);
    }
}
