package com.cdac.services;

import com.cdac.dto.LoginDTO;
import com.cdac.dto.ProductDTO;
import com.cdac.dto.SellerProfileDTO;
import com.cdac.dto.SellerSignupDTO;
import com.cdac.entities.Order;
import com.cdac.entities.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SellerService {

    ResponseEntity<?> signup(SellerSignupDTO dto);

    ResponseEntity<?> login(LoginDTO dto);

    ResponseEntity<?> getDashboard(Long sellerId);

    ResponseEntity<?> addProduct(ProductDTO dto);

    List<Product> getSellerProducts(Long sellerId);

    ResponseEntity<?> updateProduct(Long productId, ProductDTO dto);

    ResponseEntity<?> deleteProduct(Long productId);

    List<Order> getSellerOrders(Long sellerId);

    ResponseEntity<?> updateOrderStatus(Long orderId, String status);
    
    ResponseEntity<?> updateProfile(Long sellerId, SellerProfileDTO dto);
}
