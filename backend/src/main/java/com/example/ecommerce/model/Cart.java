package com.example.ecommerce.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

/**
 * OOP Concept: ENCAPSULATION
 * Cart is associated to a user, holds CartItems internally.
 */
@Document(collection = "carts")
public class Cart {

    @Id
    private String id;

    private String userId;

    private List<CartItem> items = new ArrayList<>();

    public Cart() {}

    public Cart(String userId) {
        this.userId = userId;
    }

    // Encapsulation: Getters/Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public List<CartItem> getItems() { return items; }
    public void setItems(List<CartItem> items) { this.items = items; }

    public double getTotalPrice() {
        return items.stream()
                .mapToDouble(item -> item.getFinalPrice() * item.getQuantity())
                .sum();
    }

    public double getTotalOriginalPrice() {
        return items.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
    }

    public double getTotalSavings() {
        return getTotalOriginalPrice() - getTotalPrice();
    }

    // Inner class for cart items (Encapsulation)
    public static class CartItem {
        private String productId;
        private String productName;
        private String productType;
        private double price;
        private double finalPrice;
        private int quantity;
        private String imageUrl;

        public CartItem() {}

        public String getProductId() { return productId; }
        public void setProductId(String productId) { this.productId = productId; }

        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }

        public String getProductType() { return productType; }
        public void setProductType(String productType) { this.productType = productType; }

        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }

        public double getFinalPrice() { return finalPrice; }
        public void setFinalPrice(double finalPrice) { this.finalPrice = finalPrice; }

        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }

        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    }
}
