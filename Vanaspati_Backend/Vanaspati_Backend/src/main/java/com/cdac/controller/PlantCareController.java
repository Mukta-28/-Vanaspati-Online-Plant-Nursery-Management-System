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
@RequestMapping("/api/plantcare")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequiredArgsConstructor
public class PlantCareController {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getAllPlantCareItems() {
        try {
            List<Product> plantCareItems = productRepository.findByCategory(Category.PLANTCARE);
            if (plantCareItems.isEmpty()) {
                return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResponse("No plant care items found", true));
            }
            return ResponseEntity.ok((Object) plantCareItems);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error fetching plant care items: " + e.getMessage(), false));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlantCareItem(@PathVariable Long id) {
        try {
            return productRepository.findById(id)
                    .filter(product -> product.getCategory() == Category.PLANTCARE)
                    .map(product -> ResponseEntity.ok((Object) product))
                    .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse("Plant care item not found with id: " + id, false)));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error fetching plant care item: " + e.getMessage(), false));
        }
    }

    @PostMapping
    public ResponseEntity<?> createPlantCareItem(@RequestBody ProductDTO dto) {
        try {
            User seller = userRepository.findById(dto.getSellerId())
                    .orElseThrow(() -> new RuntimeException("Seller not found"));

            Product product = new Product();
            product.setProductName(dto.getName());
            product.setDescription(dto.getDescription());
            product.setPrice(dto.getPrice().floatValue());
            product.setImage(dto.getImageUrl());
            product.setCategory(Category.PLANTCARE);
            product.setSeller(seller);
            product.setSale(dto.getStock() != null ? dto.getStock() : 0);

            Product savedProduct = productRepository.save(product);
            return ResponseEntity.status(HttpStatus.CREATED).body((Object) savedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse(e.getMessage(), false));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error creating plant care item: " + e.getMessage(), false));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlantCareItem(@PathVariable Long id, @RequestBody ProductDTO dto) {
        try {
            return productRepository.findById(id)
                    .filter(product -> product.getCategory() == Category.PLANTCARE)
                    .map(product -> {
                        product.setProductName(dto.getName());
                        product.setDescription(dto.getDescription());
                        product.setPrice(dto.getPrice().floatValue());
                        product.setImage(dto.getImageUrl());
                        product.setSale(dto.getStock() != null ? dto.getStock() : 0);
                        Product updatedProduct = productRepository.save(product);
                        return ResponseEntity.ok((Object) updatedProduct);
                    })
                    .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse("Plant care item not found with id: " + id, false)));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error updating plant care item: " + e.getMessage(), false));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlantCareItem(@PathVariable Long id) {
        try {
            return productRepository.findById(id)
                    .filter(product -> product.getCategory() == Category.PLANTCARE)
                    .map(product -> {
                        productRepository.delete(product);
                        return ResponseEntity.ok(new ApiResponse("Plant care item deleted successfully", true));
                    })
                    .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse("Plant care item not found with id: " + id, false)));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error deleting plant care item: " + e.getMessage(), false));
        }
    }
}
