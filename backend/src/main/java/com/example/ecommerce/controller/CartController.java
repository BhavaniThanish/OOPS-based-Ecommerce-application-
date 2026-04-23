package com.example.ecommerce.controller;

import com.example.ecommerce.model.Cart;
import com.example.ecommerce.security.JwtUtil;
import com.example.ecommerce.service.CartService;
import com.example.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    private String getUserIdFromToken(String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);
        return userService.findByEmail(email).orElseThrow().getId();
    }

    @GetMapping
    public ResponseEntity<Cart> getCart(@RequestHeader("Authorization") String authHeader) {
        String userId = getUserIdFromToken(authHeader);
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestHeader("Authorization") String authHeader,
                                          @RequestBody Map<String, Object> body) {
        String userId = getUserIdFromToken(authHeader);
        String productId = (String) body.get("productId");
        int quantity = (Integer) body.getOrDefault("quantity", 1);
        return ResponseEntity.ok(cartService.addToCart(userId, productId, quantity));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Cart> removeFromCart(@RequestHeader("Authorization") String authHeader,
                                               @PathVariable String productId) {
        String userId = getUserIdFromToken(authHeader);
        return ResponseEntity.ok(cartService.removeFromCart(userId, productId));
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<Cart> updateQuantity(@RequestHeader("Authorization") String authHeader,
                                               @PathVariable String productId,
                                               @RequestBody Map<String, Integer> body) {
        String userId = getUserIdFromToken(authHeader);
        return ResponseEntity.ok(cartService.updateQuantity(userId, productId, body.get("quantity")));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Cart> clearCart(@RequestHeader("Authorization") String authHeader) {
        String userId = getUserIdFromToken(authHeader);
        return ResponseEntity.ok(cartService.clearCart(userId));
    }
}
