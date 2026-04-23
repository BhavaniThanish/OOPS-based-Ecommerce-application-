package com.example.ecommerce.model;

import com.example.ecommerce.interfaces.Shippable;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * OOP Concepts: INHERITANCE + POLYMORPHISM + INTERFACE IMPLEMENTATION
 * - Extends BaseProduct (Inheritance)
 * - Overrides calculateDiscount() with 10% for electronics (Polymorphism)
 * - Implements Shippable interface
 */
@Document(collection = "products")
public class Electronics extends BaseProduct implements Shippable {

    private int warrantyMonths;
    private String brand;
    private String modelNumber;

    public Electronics() {
        super();
    }

    public Electronics(String name, double price, int stock, String description,
                       int warrantyMonths, String brand) {
        super(name, price, "ELECTRONICS", stock, description);
        this.warrantyMonths = warrantyMonths;
        this.brand = brand;
    }

    /**
     * OOP Concept: POLYMORPHISM — Electronics get 10% discount
     */
    @Override
    public double calculateDiscount() {
        return getPrice() * 0.10; // 10% discount for electronics
    }

    /**
     * OOP Concept: INTERFACE IMPLEMENTATION — Shippable
     * Electronics are heavy, so shipping cost is ₹100
     */
    @Override
    public double getShippingCost() {
        return 100.0;
    }

    /**
     * Free shipping only for orders above ₹10,000
     */
    @Override
    public boolean isEligibleForFreeShipping() {
        return getPrice() > 10000;
    }

    // Getters/Setters (Encapsulation)
    public int getWarrantyMonths() { return warrantyMonths; }
    public void setWarrantyMonths(int warrantyMonths) { this.warrantyMonths = warrantyMonths; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModelNumber() { return modelNumber; }
    public void setModelNumber(String modelNumber) { this.modelNumber = modelNumber; }

    public String getProductType() { return "ELECTRONICS"; }
}
