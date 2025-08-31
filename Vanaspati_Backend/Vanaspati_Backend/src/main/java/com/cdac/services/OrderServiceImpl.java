package com.cdac.services;

import com.cdac.dto.OrderDTO;
import com.cdac.dto.OrderItemDTO;
import com.cdac.entities.*;
import com.cdac.repository.OrderItemRepository;
import com.cdac.repository.OrderRepository;
import com.cdac.repository.ProductRepository;
import com.cdac.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final UserRepository userRepo;
    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;
    private final OrderItemRepository orderItemRepo;

    @Override
    public Order placeOrder(OrderDTO dto) {
        User buyer = userRepo.findById(dto.getBuyerId())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        Order order = new Order();
        order.setBuyer(buyer);
        order.setAddress(dto.getAddress());
        order.setStatus(Status.PENDING);
        order.setPaymentStatus(Order.PaymentStatus.unpaid);
        order.setTotalAmount(BigDecimal.ZERO);
        order = orderRepo.save(order);

        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemDTO itemDTO : dto.getItems()) {
            Product product = productRepo.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(itemDTO.getQuantity());
            item.setPrice(BigDecimal.valueOf(itemDTO.getPrice()));
            orderItemRepo.save(item);

            total = total.add(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        order.setTotalAmount(total);
        return orderRepo.save(order);
    }

    @Override
    public List<Order> getOrdersForBuyer(Long buyerId) {
        return orderRepo.findByBuyerId(buyerId);
    }

    @Override
    public List<Order> getOrdersForSeller(Long sellerId) {
        return orderRepo.findOrdersBySellerId(sellerId);
    }

}

