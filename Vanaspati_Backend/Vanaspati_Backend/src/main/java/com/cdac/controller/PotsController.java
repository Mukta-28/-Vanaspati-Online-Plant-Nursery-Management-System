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
@RequestMapping("/api/pots")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequiredArgsConstructor
public class PotsController {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getAllPots() {
        try {
            List<Product> pots = productRepository.findByCategory(Category.POT_AND_PLANTER);
            if (pots.isEmpty()) {
                return ResponseEntity.ok(new ApiResponse("No pots found", true));
            }
            return ResponseEntity.ok(pots);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching pots: " + e.getMessage(), false));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPot(@PathVariable Long id) {
        try {
            return productRepository.findById(id)
                    .filter(product -> product.getCategory() == Category.POT_AND_PLANTER)
                    .<ResponseEntity<?>>map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new ApiResponse("Pot not found with id: " + id, false)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching pot: " + e.getMessage(), false));
        }
    }

    @PostMapping
    public ResponseEntity<?> createPot(@RequestBody ProductDTO dto) {
        try {
            User seller = userRepository.findById(dto.getSellerId())
                    .orElseThrow(() -> new RuntimeException("Seller not found"));

            Product product = new Product();
            product.setProductName(dto.getName());
            product.setDescription(dto.getDescription());
            product.setPrice(dto.getPrice().floatValue());
            product.setImage(dto.getImageUrl());
            product.setCategory(Category.POT_AND_PLANTER);
            product.setSeller(seller);
            product.setSale(dto.getStock() != null ? dto.getStock() : 0);

            return ResponseEntity.status(HttpStatus.CREATED).body(productRepository.save(product));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), false));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error creating pot: " + e.getMessage(), false));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePot(@PathVariable Long id, @RequestBody ProductDTO dto) {
        try {
            return productRepository.findById(id)
                    .filter(product -> product.getCategory() == Category.POT_AND_PLANTER)
                    .<ResponseEntity<?>>map(product -> {
                        product.setProductName(dto.getName());
                        product.setDescription(dto.getDescription());
                        product.setPrice(dto.getPrice().floatValue());
                        product.setImage(dto.getImageUrl());
                        product.setSale(dto.getStock() != null ? dto.getStock() : 0);
                        return ResponseEntity.ok(productRepository.save(product));
                    })
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new ApiResponse("Pot not found with id: " + id, false)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error updating pot: " + e.getMessage(), false));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePot(@PathVariable Long id) {
        try {
            return productRepository.findById(id)
                    .filter(product -> product.getCategory() == Category.POT_AND_PLANTER)
                    .<ResponseEntity<?>>map(product -> {
                        productRepository.delete(product);
                        return ResponseEntity.ok(new ApiResponse("Pot deleted successfully", true));
                    })
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new ApiResponse("Pot not found with id: " + id, false)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error deleting pot: " + e.getMessage(), false));
        }
    }
}
