package com.cdac.controller;

import com.cdac.dto.LoginDTO;
import com.cdac.dto.ProductDTO;
import com.cdac.dto.SellerProfileDTO;
import com.cdac.dto.SellerSignupDTO;
import com.cdac.entities.Order;
import com.cdac.entities.Product;
import com.cdac.exception.ApiResponse;
import com.cdac.services.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sellers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SellerController {

    private final SellerService sellerService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SellerSignupDTO dto) {
        return sellerService.signup(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
        return sellerService.login(dto);
    }

    @GetMapping("/dashboard/{sellerId}")
    public ResponseEntity<?> dashboard(@PathVariable Long sellerId) {
        return sellerService.getDashboard(sellerId);
    }

    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@RequestBody ProductDTO dto) {
        return sellerService.addProduct(dto);
    }

    @GetMapping("/products/{sellerId}")
    public ResponseEntity<?> getProducts(@PathVariable Long sellerId) {
        try {
            List<Product> products = sellerService.getSellerProducts(sellerId);
            if (products.isEmpty()) {
                return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResponse("No products found for this seller", true));
            }
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error fetching seller products: " + e.getMessage(), false));
        }
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId, @RequestBody ProductDTO dto) {
        return sellerService.updateProduct(productId, dto);
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        return sellerService.deleteProduct(productId);
    }

    @GetMapping("/orders/{sellerId}")
    public ResponseEntity<?> getOrders(@PathVariable Long sellerId) {
        try {
            List<Order> orders = sellerService.getSellerOrders(sellerId);
            if (orders.isEmpty()) {
                return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResponse("No orders found for this seller", true));
            }
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error fetching seller orders: " + e.getMessage(), false));
        }
    }

    @PutMapping("/orders/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
        return sellerService.updateOrderStatus(orderId, status);
    }
    
    @PutMapping("/profile/{sellerId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long sellerId, @RequestBody SellerProfileDTO dto) {
        try {
            return sellerService.updateProfile(sellerId, dto);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error updating seller profile: " + e.getMessage(), false));
        }
    }
}


