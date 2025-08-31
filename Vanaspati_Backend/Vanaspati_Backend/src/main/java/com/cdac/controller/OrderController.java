package com.cdac.controller;

import com.cdac.dto.OrderDTO;
import com.cdac.dto.OrderResponseDTO;
import com.cdac.entities.Order;
import com.cdac.exception.ApiResponse;
import com.cdac.mapper.OrderMapper;
import com.cdac.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody @Valid OrderDTO dto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(orderService.placeOrder(dto));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error placing order: " + e.getMessage(), false));
        }
    }


    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<?> getOrdersByBuyer(@PathVariable Long buyerId) {
        try {
            List<Order> orders = orderService.getOrdersForBuyer(buyerId);
            if (orders.isEmpty()) {
                return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResponse("No orders found for this buyer", true));
            }
            List<OrderResponseDTO> orderDTOs = orders.stream()
                    .map(OrderMapper::toOrderResponseDTO)
                    .toList();
            return ResponseEntity.ok(orderDTOs);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error fetching buyer orders: " + e.getMessage(), false));
        }
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<?> getOrdersBySeller(@PathVariable Long sellerId) {
        try {
            List<Order> orders = orderService.getOrdersForSeller(sellerId);
            if (orders.isEmpty()) {
                return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResponse("No orders found for this seller", true));
            }
            List<OrderResponseDTO> orderDTOs = orders.stream()
                    .map(OrderMapper::toOrderResponseDTO)
                    .toList();
            return ResponseEntity.ok(orderDTOs);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error fetching seller orders: " + e.getMessage(), false));
        }
    }

}


