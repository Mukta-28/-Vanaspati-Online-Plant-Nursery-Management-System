package com.cdac.controller;

import com.cdac.dto.BuyerSignUpDTO;
import com.cdac.dto.LoginDTO;
import com.cdac.dto.SellerSignupDTO;
import com.cdac.dto.UserResponse;
import com.cdac.entities.Role;
import com.cdac.entities.User;
import com.cdac.repository.UserRepository;
import com.cdac.security.JwtUtils;
import com.cdac.services.BuyerService;
import com.cdac.services.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")

@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final BuyerService buyerService;
    private final SellerService sellerService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        System.out.println("TEMP-> login"+loginDTO);
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userRepository.findByEmail(loginDTO.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String jwt = jwtUtils.generateToken(user.getEmail(), user.getRole().name());

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", jwt);
            response.put("userEmail", user.getEmail());
            response.put("userRole", user.getRole().name());
            response.put("userName", user.getName());
            response.put("userId", user.getId());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> registrationData) {
        String role = (String) registrationData.get("role");

        if (role == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Role is required"));
        }

        if (role.equalsIgnoreCase("buyer")) {
            BuyerSignUpDTO buyerDTO = new BuyerSignUpDTO();
            buyerDTO.setName((String) registrationData.get("name"));
            buyerDTO.setEmail((String) registrationData.get("email"));
            buyerDTO.setPassword((String) registrationData.get("password"));
            buyerDTO.setMobile((String) registrationData.get("mobile"));
            buyerDTO.setAddress((String) registrationData.get("address"));

            UserResponse response = buyerService.registerBuyer(buyerDTO);
            String jwt = jwtUtils.generateToken(response.getEmail(), Role.Buyer.name());

            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("accessToken", jwt);
            responseMap.put("userEmail", response.getEmail());
            responseMap.put("userRole", "Buyer");
            responseMap.put("userName", response.getName());
            responseMap.put("userId", response.getId());

            return ResponseEntity.status(HttpStatus.CREATED).body(responseMap);
        } else if (role.equalsIgnoreCase("seller")) {
            SellerSignupDTO sellerDTO = new SellerSignupDTO();
            sellerDTO.setName((String) registrationData.get("name"));
            sellerDTO.setEmail((String) registrationData.get("email"));
            sellerDTO.setPassword((String) registrationData.get("password"));
            sellerDTO.setMobile((String) registrationData.get("mobile"));
            sellerDTO.setAddress((String) registrationData.get("address"));

            return sellerService.signup(sellerDTO);
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid role"));
        }
    }
}