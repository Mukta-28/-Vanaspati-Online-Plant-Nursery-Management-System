package com.cdac.controller;

import com.cdac.entities.Product;
import com.cdac.exception.ApiResponse;
import com.cdac.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequiredArgsConstructor
public class SearchController {

    private final ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<?> searchProducts(@RequestParam String query) {
        try {
            if (query == null || query.trim().isEmpty()) {
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Search query cannot be empty", false));
            }
            
            String searchTerm = query.toLowerCase();
            List<Product> products = productRepository.findAll().stream()
                    .filter(product -> 
                        product.getProductName().toLowerCase().contains(searchTerm) ||
                        (product.getDescription() != null && 
                         product.getDescription().toLowerCase().contains(searchTerm)))
                    .collect(Collectors.toList());
            
            if (products.isEmpty()) {
                return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResponse("No products found matching: " + query, true));
            }
            
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error searching products: " + e.getMessage(), false));
        }
    }
}