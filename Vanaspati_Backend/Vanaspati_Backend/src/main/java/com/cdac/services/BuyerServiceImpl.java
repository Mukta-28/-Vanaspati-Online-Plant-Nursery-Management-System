package com.cdac.services;

import com.cdac.custom_exceptions.ApiException;
import com.cdac.dao.UserDao;
import com.cdac.dto.BuyerProfileDTO;
import com.cdac.dto.BuyerSignUpDTO;
import com.cdac.dto.LoginDTO;
import com.cdac.dto.UserResponse;
import com.cdac.entities.Role;
import com.cdac.entities.User;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class BuyerServiceImpl implements BuyerService {

    private final UserDao userDao;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse registerBuyer(BuyerSignUpDTO dto) {
        if (userDao.existsByEmail(dto.getEmail()))
            throw new ApiException("Email already exists");

    User user = modelMapper.map(dto, User.class);
    user.setRole(Role.Buyer); // Make sure your Role enum has BUYER
    user.setPassword(passwordEncoder.encode(dto.getPassword()));

    User savedUser = userDao.save(user);
    return modelMapper.map(savedUser, UserResponse.class);
    }

    @Override
    public ResponseEntity<?> login(LoginDTO dto) {
        User user = userDao.findByEmail(dto.getEmail())
                .orElseThrow(() -> new ApiException("Invalid credentials"));

        if (!Role.Buyer.equals(user.getRole())) {
            throw new ApiException("Access denied: Not a buyer");
        }

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new ApiException("Invalid credentials");
        }

        UserResponse res = modelMapper.map(user, UserResponse.class);
        return ResponseEntity.ok(res);
    }
    
    @Override
    public ResponseEntity<?> updateProfile(Long buyerId, BuyerProfileDTO dto) {
        Optional<User> buyerOpt = userDao.findById(buyerId);
        if (buyerOpt.isEmpty() || buyerOpt.get().getRole() != Role.Buyer) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid buyer ID"));
        }
        
        User buyer = buyerOpt.get();
        buyer.setName(dto.getName());
        buyer.setEmail(dto.getEmail());
        buyer.setMobile(dto.getPhone());
        buyer.setAddress(dto.getAddress());
        userDao.save(buyer);
        
        return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
    }
}
