package com.example.shop.repositories;

import com.example.shop.entities.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRep  extends JpaRepository<Product,Long>, PagingAndSortingRepository<Product, Long> {
}
