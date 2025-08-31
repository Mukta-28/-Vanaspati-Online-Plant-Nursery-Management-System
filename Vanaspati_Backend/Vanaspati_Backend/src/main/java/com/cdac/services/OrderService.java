package com.cdac.services;

import com.cdac.dto.OrderDTO;
import com.cdac.entities.Order;

import java.util.List;

public interface OrderService {
    Order placeOrder(OrderDTO dto);
    List<Order> getOrdersForBuyer(Long buyerId);
    List<Order> getOrdersForSeller(Long sellerId);


}

