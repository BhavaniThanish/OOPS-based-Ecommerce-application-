package com.example.ecommerce.controller;

import com.example.ecommerce.model.User;
import com.example.ecommerce.security.JwtUtil;
import com.example.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User saved = userService.registerUser(user);
            String token = jwtUtil.generateToken(saved.getEmail());
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", Map.of("id", saved.getId(), "name", saved.getName(),
                    "email", saved.getEmail(), "role", saved.getRole()));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials.get("email"), credentials.get("password"))
            );
            String token = jwtUtil.generateToken(credentials.get("email"));
            User user = userService.findByEmail(credentials.get("email")).orElseThrow();
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", Map.of("id", user.getId(), "name", user.getName(),
                    "email", user.getEmail(), "role", user.getRole()));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid email or password"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7);
            String email = jwtUtil.extractUsername(token);
            User user = userService.findByEmail(email).orElseThrow();
            return ResponseEntity.ok(Map.of("id", user.getId(), "name", user.getName(),
                    "email", user.getEmail(), "role", user.getRole()));
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }
}
