package com.cdac.controller;

import com.cdac.dto.BuyerProfileDTO;
import com.cdac.dto.BuyerSignUpDTO;
import com.cdac.dto.LoginDTO;
import com.cdac.exception.ApiResponse;
import com.cdac.services.BuyerService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buyer")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class BuyerController {

    @Autowired
    private BuyerService buyerService;

    public BuyerController() {
        System.out.println("in ctor of " + getClass());
    }

    @PostMapping("/signup")
    @Operation(description = "Buyer sign up")
    public ResponseEntity<?> buyerSignUp(
            @RequestBody @Valid BuyerSignUpDTO dto ) {
        try {
            System.out.println("in buyer sign up "+dto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(buyerService.registerBuyer(dto));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error during buyer signup: " + e.getMessage(), false));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginBuyer(@RequestBody LoginDTO dto) {
        try {
            return buyerService.login(dto);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error during buyer login: " + e.getMessage(), false));
        }
    }
    
    @PutMapping("/profile/{buyerId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long buyerId, @RequestBody BuyerProfileDTO dto) {
        try {
            return buyerService.updateProfile(buyerId, dto);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error updating buyer profile: " + e.getMessage(), false));
        }
    }

}
