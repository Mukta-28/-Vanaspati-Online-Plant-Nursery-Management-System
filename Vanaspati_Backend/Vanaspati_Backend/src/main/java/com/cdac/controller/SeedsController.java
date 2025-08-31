package com.cdac.controller;

import com.cdac.dto.ProductDTO;
import com.cdac.entities.Category;
import com.cdac.entities.Product;
import com.cdac.entities.User;
import com.cdac.exception.ApiResponse;
import com.cdac.repository.ProductRepository;
import com.cdac.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seeds")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequiredArgsConstructor
public class SeedsController {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getAllSeeds() {
        try {
            List<Product> seeds = productRepository.findByCategory(Category.SEED);
            if (seeds.isEmpty()) {
                return ResponseEntity.ok(new ApiResponse("No seeds found", true));
            }
            return ResponseEntity.ok(seeds);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching seeds: " + e.getMessage(), false));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSeed(@PathVariable Long id) {
        try {
            return productRepository.findById(id)
                    .filter(product -> product.getCategory() == Category.SEED)
                    .<ResponseEntity<?>>map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new ApiResponse("Seed not found with id: " + id, false)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching seed: " + e.getMessage(), false));
        }
    }

    @PostMapping
    public ResponseEntity<?> createSeed(@RequestBody ProductDTO dto) {
        try {
            User seller = userRepository.findById(dto.getSellerId())
                    .orElseThrow(() -> new RuntimeException("Seller not found"));

            Product product = new Product();
            product.setProductName(dto.getName());
            product.setDescription(dto.getDescription());
            product.setPrice(dto.getPrice().floatValue());
            product.setImage(dto.getImageUrl());
            product.setCategory(Category.SEED);
            product.setSeller(seller);
            product.setSale(dto.getStock() != null ? dto.getStock() : 0);

            return ResponseEntity.status(HttpStatus.CREATED).body(productRepository.save(product));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), false));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error creating seed: " + e.getMessage(), false));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSeed(@PathVariable Long id, @RequestBody ProductDTO dto) {
        try {
            return productRepository.findById(id)
                    .filter(product -> product.getCategory() == Category.SEED)
                    .<ResponseEntity<?>>map(product -> {
                        product.setProductName(dto.getName());
                        product.setDescription(dto.getDescription());
                        product.setPrice(dto.getPrice().floatValue());
                        product.setImage(dto.getImageUrl());
                        product.setSale(dto.getStock() != null ? dto.getStock() : 0);
                        return ResponseEntity.ok(productRepository.save(product));
                    })
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new ApiResponse("Seed not found with id: " + id, false)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error updating seed: " + e.getMessage(), false));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSeed(@PathVariable Long id) {
        try {
            return productRepository.findById(id)
                    .filter(product -> product.getCategory() == Category.SEED)
                    .<ResponseEntity<?>>map(product -> {
                        productRepository.delete(product);
                        return ResponseEntity.ok(new ApiResponse("Seed deleted successfully", true));
                    })
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new ApiResponse("Seed not found with id: " + id, false)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error deleting seed: " + e.getMessage(), false));
        }
    }
}
