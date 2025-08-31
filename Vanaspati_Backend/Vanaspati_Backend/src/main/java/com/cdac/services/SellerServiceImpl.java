package com.cdac.services;

import com.cdac.dto.LoginDTO;
import com.cdac.dto.ProductDTO;
import com.cdac.dto.SellerProfileDTO;
import com.cdac.dto.SellerSignupDTO;
import com.cdac.entities.*;
import com.cdac.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class SellerServiceImpl implements SellerService {

    private final UserRepository userRepo;
    private final SellerProfileRepository sellerProfileRepo;
    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<?> signup(SellerSignupDTO dto) {
        Optional<User> existing = userRepo.findByEmail(dto.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already registered"));
        }

        User seller = new User();
        seller.setName(dto.getName());
        seller.setEmail(dto.getEmail());
    seller.setPassword(passwordEncoder.encode(dto.getPassword()));
        seller.setMobile(dto.getMobile());
        seller.setRole(Role.Seller);
        seller.setStatus(Status.VERIFIED);

        userRepo.save(seller);

        SellersProfile profile = new SellersProfile();
        profile.setSeller(seller);
        profile.setNurseryName(dto.getShopName());
        profile.setGstin(dto.getGstNumber());
        profile.setAddress(dto.getAddress());

        sellerProfileRepo.save(profile);

        return ResponseEntity.ok(Map.of("message", "Seller registered successfully", "status", "PENDING"));
    }

    @Override
    public ResponseEntity<?> login(LoginDTO dto) {
        Optional<User> userOpt = userRepo.findByEmailAndRole(dto.getEmail(), Role.Seller);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
                return ResponseEntity.ok(Map.of("message", "Login successful", "userId", user.getId(), "userRole", user.getRole()));
            } else {
                return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
            }
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
        }
    }

    @Override
    public ResponseEntity<?> getDashboard(Long sellerId) {
        Optional<User> seller = userRepo.findById(sellerId);
        if (seller.isEmpty() || seller.get().getRole() != Role.Seller) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid seller ID"));
        }

        List<Product> products = productRepo.findBySellerId(sellerId);
        List<Order> orders = orderRepo.findBySellerId(sellerId);

        return ResponseEntity.ok(Map.of(
                "products", products,
                "orders", orders
        ));
    }

    @Override
    public ResponseEntity<?> addProduct(ProductDTO dto) {
        Optional<User> seller = userRepo.findById(dto.getSellerId());
        if (seller.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Seller not found"));
        }

        Product product = new Product();
        product.setProductName(dto.getProductName());
        product.setCategory(Category.valueOf(dto.getCategory()));
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice().floatValue());
        product.setImage(dto.getImage());
        product.setStatus(dto.getStatus());
        product.setSeller(seller.get());
        product.setSale(dto.getStock() != null ? dto.getStock() : 0);

        productRepo.save(product);

        return ResponseEntity.ok(Map.of("message", "Product added successfully"));
    }

    @Override
    public List<Product> getSellerProducts(Long sellerId) {
        return productRepo.findBySellerId(sellerId);
    }

    @Override
    public ResponseEntity<?> updateProduct(Long productId, ProductDTO dto) {
        Optional<Product> productOpt = productRepo.findById(productId);
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Product not found"));
        }

        Product product = productOpt.get();
        product.setProductName(dto.getProductName());
        product.setCategory(Category.valueOf(dto.getCategory()));
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice().floatValue());
        product.setImage(dto.getImage());
        product.setStatus(dto.getStatus());
        product.setSale(dto.getStock() != null ? dto.getStock() : 0);

        productRepo.save(product);
        return ResponseEntity.ok(Map.of("message", "Product updated successfully"));
    }

    @Override
    public ResponseEntity<?> deleteProduct(Long productId) {
        if (!productRepo.existsById(productId)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Product not found"));
        }
        productRepo.deleteById(productId);
        return ResponseEntity.ok(Map.of("message", "Product deleted successfully"));
    }

    @Override
    public List<Order> getSellerOrders(Long sellerId) {
        return orderRepo.findBySellerId(sellerId);
    }

    @Override
    public ResponseEntity<?> updateOrderStatus(Long orderId, String status) {
        Optional<Order> orderOpt = orderRepo.findById(orderId);
        if (orderOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Order not found"));
        }

        Order order = orderOpt.get();
        order.setStatus(Status.valueOf(status.toUpperCase()));
        orderRepo.save(order);
        return ResponseEntity.ok(Map.of("message", "Order status updated"));
    }
    
    @Override
    public ResponseEntity<?> updateProfile(Long sellerId, SellerProfileDTO dto) {
        Optional<User> sellerOpt = userRepo.findById(sellerId);
        if (sellerOpt.isEmpty() || sellerOpt.get().getRole() != Role.Seller) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid seller ID"));
        }
        
        User seller = sellerOpt.get();
        seller.setName(dto.getOwnerName());
        seller.setEmail(dto.getEmail());
        seller.setMobile(dto.getContactNumber());
        userRepo.save(seller);
        
        Optional<SellersProfile> profileOpt = sellerProfileRepo.findBySellerIdEquals(sellerId);
        if (profileOpt.isPresent()) {
            SellersProfile profile = profileOpt.get();
            profile.setNurseryName(dto.getNurseryName());
            profile.setGstin(dto.getGstin());
            profile.setAddress(dto.getAddress());
            sellerProfileRepo.save(profile);
        } else {
            SellersProfile newProfile = new SellersProfile();
            newProfile.setSeller(seller);
            newProfile.setNurseryName(dto.getNurseryName());
            newProfile.setGstin(dto.getGstin());
            newProfile.setAddress(dto.getAddress());
            sellerProfileRepo.save(newProfile);
        }
        
        return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
    }
}

