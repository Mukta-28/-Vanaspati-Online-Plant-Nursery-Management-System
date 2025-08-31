package com.cdac.controller;

import com.cdac.dto.CartItemDTO;
import com.cdac.entities.CartItem;
import com.cdac.exception.ApiResponse;
import com.cdac.services.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestBody @Valid CartItemDTO dto) {
        try {
            CartItem cartItem = cartService.addToCart(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(cartItem);
        } catch (RuntimeException e) {
            throw e; // Will be handled by GlobalExceptionHandler
        }
    }

    @GetMapping("/{buyerId}")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable Long buyerId) {
        try {
            List<CartItem> cartItems = cartService.getCartItems(buyerId);
            return ResponseEntity.ok(cartItems);
        } catch (RuntimeException e) {
            throw e; // Will be handled by GlobalExceptionHandler
        }
    }

    @DeleteMapping("/clear/{buyerId}")
    public ResponseEntity<ApiResponse> clearCart(@PathVariable Long buyerId) {
        try {
            cartService.clearCart(buyerId);
            return ResponseEntity.ok(new ApiResponse("Cart cleared successfully", true));
        } catch (RuntimeException e) {
            throw e; // Will be handled by GlobalExceptionHandler
        }
    }
    
    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<ApiResponse> removeCartItem(@PathVariable Long cartItemId) {
        try {
            cartService.removeCartItem(cartItemId);
            return ResponseEntity.ok(new ApiResponse("Item removed from cart", true));
        } catch (RuntimeException e) {
            throw e; // Will be handled by GlobalExceptionHandler
        }
    }
}
