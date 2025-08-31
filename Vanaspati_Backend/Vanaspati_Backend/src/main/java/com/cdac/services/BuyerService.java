package com.cdac.services;

import com.cdac.dto.BuyerProfileDTO;
import com.cdac.dto.BuyerSignUpDTO;
import com.cdac.dto.LoginDTO;
import com.cdac.dto.UserResponse;
import org.springframework.http.ResponseEntity;

public interface BuyerService {
    UserResponse registerBuyer(BuyerSignUpDTO dto);
    ResponseEntity<?> login(LoginDTO dto);
    ResponseEntity<?> updateProfile(Long buyerId, BuyerProfileDTO dto);
}
