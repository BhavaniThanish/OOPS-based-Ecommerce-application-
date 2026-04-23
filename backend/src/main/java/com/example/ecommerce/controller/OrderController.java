package com.example.ecommerce.controller;

import com.example.ecommerce.model.Order;
import com.example.ecommerce.security.JwtUtil;
import com.example.ecommerce.service.OrderService;
import com.example.ecommerce.service.UserService;
import com.example.ecommerce.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    private User getUserFromToken(String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);
        return userService.findByEmail(email).orElseThrow();
    }

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestHeader("Authorization") String authHeader,
                                            @RequestBody Map<String, String> body) {
        User user = getUserFromToken(authHeader);
        String shippingAddress = body.getOrDefault("shippingAddress", "Default Address");
        return ResponseEntity.ok(orderService.placeOrder(user.getId(), user.getEmail(), shippingAddress));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders(@RequestHeader("Authorization") String authHeader) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(orderService.getOrdersByUser(user.getId()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable String id,
                                              @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, body.get("status")));
    }
}
