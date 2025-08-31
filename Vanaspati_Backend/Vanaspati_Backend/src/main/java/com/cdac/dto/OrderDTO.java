package com.cdac.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderDTO {
    private Long buyerId;
    private List<OrderItemDTO> items;
    private String address;
}

