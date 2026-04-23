package com.example.ecommerce.model;

import com.example.ecommerce.interfaces.Discountable;
import org.springframework.data.annotation.Id;

/**
 * OOP Concept: ABSTRACTION + ENCAPSULATION
 * - Abstract class with private fields and getters/setters (Encapsulation)
 * - Abstract method calculateDiscount() forces subclasses to implement their own logic (Abstraction)
 * - Implements Discountable interface
 */
public abstract class BaseProduct implements Discountable {

    @Id
    private String id;

    private String name;
    private double price;
    private String category;
    private int stock;
    private String imageUrl;
    private String description;

    // Default constructor
    protected BaseProduct() {}

    protected BaseProduct(String name, double price, String category, int stock, String description) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.stock = stock;
        this.description = description;
    }

    /**
     * OOP Concept: POLYMORPHISM (Abstract Method)
     * Each subclass MUST override this with its own discount logic.
     */
    @Override
    public abstract double calculateDiscount();

    /**
     * OOP Concept: POLYMORPHISM (Concrete method using abstract result)
     * This method works for all product types — but results differ based on subclass.
     */
    @Override
    public double getFinalPrice() {
        return this.price - calculateDiscount();
    }

    // ============================
    // Encapsulation: Getters/Setters
    // ============================
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
