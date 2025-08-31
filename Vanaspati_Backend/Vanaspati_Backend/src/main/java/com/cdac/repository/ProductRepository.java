package com.cdac.repository;

import com.cdac.entities.Category;
import com.cdac.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySellerId(Long sellerId);

    List<Product> findByCategory(Category category);
    List<Product> findByCategoryOrderByPriceAsc(Category category);
    List<Product> findByCategoryOrderByPriceDesc(Category category);


}
