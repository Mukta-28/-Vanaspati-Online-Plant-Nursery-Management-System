package com.cdac.services;

import com.cdac.dto.CartItemDTO;
import com.cdac.entities.CartItem;

import java.util.List;

public interface CartService {
    CartItem addToCart(CartItemDTO dto);
    List<CartItem> getCartItems(Long buyerId);
    void clearCart(Long buyerId);
    void removeCartItem(Long cartItemId);
}


