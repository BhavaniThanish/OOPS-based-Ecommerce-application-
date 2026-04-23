package com.example.ecommerce.service;

import com.example.ecommerce.model.Cart;
import com.example.ecommerce.model.Order;
import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    public Order placeOrder(String userId, String userEmail, String shippingAddress) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user: " + userId));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cannot place order: cart is empty");
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setUserEmail(userEmail);
        order.setItems(cart.getItems());
        order.setTotalAmount(cart.getTotalPrice());
        order.setTotalSavings(cart.getTotalSavings());
        order.setShippingAddress(shippingAddress);
        order.setStatus("CONFIRMED");

        Order saved = orderRepository.save(order);

        // Clear cart after order
        cart.getItems().clear();
        cartRepository.save(cart);

        return saved;
    }

    public List<Order> getOrdersByUser(String userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(String orderId, String status) {
        return orderRepository.findById(orderId).map(order -> {
            order.setStatus(status);
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
    }
}
