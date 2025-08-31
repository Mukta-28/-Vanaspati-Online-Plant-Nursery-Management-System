package com.cdac.mapper;

import com.cdac.dto.OrderItemResponseDTO;
import com.cdac.dto.OrderResponseDTO;
import com.cdac.entities.Order;
import com.cdac.entities.OrderItem;

import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderResponseDTO toOrderResponseDTO(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setOrderId(order.getOrderId().longValue());
        dto.setBuyerId(order.getBuyer().getId());
        dto.setAddress(order.getAddress());
        dto.setStatus(order.getStatus().name());
        dto.setPaymentStatus(order.getPaymentStatus().name());
        dto.setTotalAmount(order.getTotalAmount().doubleValue());
        dto.setCreatedAt(order.getCreatedAt());

        List<OrderItemResponseDTO> itemDTOs = order.getOrderItems().stream()
                .map(OrderMapper::toOrderItemResponseDTO)
                .collect(Collectors.toList());

        dto.setItems(itemDTOs);
        return dto;
    }

    public static OrderItemResponseDTO toOrderItemResponseDTO(OrderItem item) {
        OrderItemResponseDTO dto = new OrderItemResponseDTO();
        dto.setOrderItemId(item.getOrderItemId().longValue());
        dto.setProductId(item.getProduct().getId());
        dto.setProductName(item.getProduct().getProductName());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice().doubleValue());
        return dto;
    }
}

