package com.cdac.services;

import com.cdac.dto.CartItemDTO;
import com.cdac.entities.CartItem;
import com.cdac.entities.Product;
import com.cdac.entities.User;
import com.cdac.repository.CartItemRepository;
import com.cdac.repository.ProductRepository;
import com.cdac.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartItemRepository cartRepo;
    private final UserRepository userRepo;
    private final ProductRepository productRepo;

    @Override
    public CartItem addToCart(CartItemDTO dto) {
        User buyer = userRepo.findById(dto.getBuyerId())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        Product product = productRepo.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem item = new CartItem();
        item.setBuyer(buyer);
        item.setProduct(product);
        item.setQuantity(dto.getQuantity());

        return cartRepo.save(item);
    }

    @Override
    public List<CartItem> getCartItems(Long buyerId) {
        return cartRepo.findByBuyerId(buyerId);
    }

    @Override
    public void clearCart(Long buyerId) {
        cartRepo.deleteByBuyerId(buyerId);
    }
    
    @Override
    public void removeCartItem(Long cartItemId) {
        Optional<CartItem> cartItem = cartRepo.findById(cartItemId);
        if (cartItem.isEmpty()) {
            throw new RuntimeException("Cart item not found");
        }
        cartRepo.deleteById(cartItemId);
    }
}

