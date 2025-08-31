package com.cdac.controller;

import com.cdac.entities.Category;
import com.cdac.entities.Product;
import com.cdac.exception.ApiResponse;
import com.cdac.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProductController {

    private final ProductRepository productRepo;

    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        try {
            List<Product> products = productRepo.findAll();
            if (products.isEmpty()) {
                return ResponseEntity.ok(new ApiResponse("No products found", true));
            }
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching products: " + e.getMessage(), false));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable Long id) {
        try {
            return productRepo.findById(id)
                    .<ResponseEntity<?>>map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity
                            .status(HttpStatus.NOT_FOUND)
                            .body(new ApiResponse("Product not found with id: " + id, false)));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching product: " + e.getMessage(), false));
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable String category) {
        try {
            Category enumCategory = Category.valueOf(category.toUpperCase());
            List<Product> products = productRepo.findByCategory(enumCategory);

            if (products.isEmpty()) {
                return ResponseEntity.ok(new ApiResponse("No products found in category: " + category, true));
            }
            return ResponseEntity.ok(products);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Invalid category: " + category, false));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching products: " + e.getMessage(), false));
        }
    }

    @GetMapping("/category/{category}/sorted")
    public ResponseEntity<?> getProductsByCategorySorted(
            @PathVariable String category,
            @RequestParam(defaultValue = "asc") String order) {
        try {
            Category enumCategory = Category.valueOf(category.toUpperCase());
            List<Product> products;

            if (order.equalsIgnoreCase("desc")) {
                products = productRepo.findByCategoryOrderByPriceDesc(enumCategory);
            } else {
                products = productRepo.findByCategoryOrderByPriceAsc(enumCategory);
            }

            if (products.isEmpty()) {
                return ResponseEntity.ok(new ApiResponse("No products found in category: " + category, true));
            }
            return ResponseEntity.ok(products);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Invalid category: " + category, false));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching products: " + e.getMessage(), false));
        }
    }
}

