package com.example.ecommerce.model;

import com.example.ecommerce.interfaces.Shippable;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * OOP Concepts: INHERITANCE + POLYMORPHISM + INTERFACE IMPLEMENTATION
 * - Extends BaseProduct (Inheritance)
 * - Overrides calculateDiscount() with 20% for clothing (Polymorphism)
 * - Implements Shippable interface
 */
@Document(collection = "products")
public class Clothing extends BaseProduct implements Shippable {

    private String size;
    private String color;
    private String material;
    private String gender;

    public Clothing() {
        super();
    }

    public Clothing(String name, double price, int stock, String description,
                    String size, String color, String material) {
        super(name, price, "CLOTHING", stock, description);
        this.size = size;
        this.color = color;
        this.material = material;
    }

    /**
     * OOP Concept: POLYMORPHISM — Clothing gets 20% discount
     */
    @Override
    public double calculateDiscount() {
        return getPrice() * 0.20; // 20% discount for clothing
    }

    /**
     * Clothing is lightweight, ₹50 shipping
     */
    @Override
    public double getShippingCost() {
        return 50.0;
    }

    /**
     * Free shipping for orders above ₹2,000
     */
    @Override
    public boolean isEligibleForFreeShipping() {
        return getPrice() > 2000;
    }

    // Getters/Setters (Encapsulation)
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getProductType() { return "CLOTHING"; }
}
