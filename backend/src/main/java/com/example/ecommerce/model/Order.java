package com.example.ecommerce.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

/**
 * OOP Concept: ENCAPSULATION
 * Order model with all fields private and controlled access.
 */
@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private String userId;
    private String userEmail;
    private List<Cart.CartItem> items;
    private double totalAmount;
    private double totalSavings;
    private String status; // PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
    private LocalDateTime createdAt;
    private String shippingAddress;

    public Order() {
        this.createdAt = LocalDateTime.now();
        this.status = "PENDING";
    }

    // Encapsulation: Getters/Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public List<Cart.CartItem> getItems() { return items; }
    public void setItems(List<Cart.CartItem> items) { this.items = items; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public double getTotalSavings() { return totalSavings; }
    public void setTotalSavings(double totalSavings) { this.totalSavings = totalSavings; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
}
