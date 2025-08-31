package com.cdac.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderResponseDTO {
    private Long orderId;
    private Long buyerId;
    private String address;
    private String status;
    private String paymentStatus;
    private Double totalAmount;
    private LocalDateTime createdAt;
    private List<OrderItemResponseDTO> items;
}

