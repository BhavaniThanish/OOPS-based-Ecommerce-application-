package com.example.ecommerce.model;

import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

/**
 * OOP Concepts: INHERITANCE + POLYMORPHISM
 * - Extends BaseProduct (Inheritance)
 * - Overrides calculateDiscount() — 5% for food (Polymorphism)
 * - No shipping interface (food is picked up / light delivery)
 */
@Document(collection = "products")
public class FoodProduct extends BaseProduct {

    private LocalDate expiryDate;
    private boolean isOrganic;
    private String nutritionInfo;
    private double weightKg;

    public FoodProduct() {
        super();
    }

    public FoodProduct(String name, double price, int stock, String description,
                       boolean isOrganic, double weightKg) {
        super(name, price, "FOOD", stock, description);
        this.isOrganic = isOrganic;
        this.weightKg = weightKg;
    }

    /**
     * OOP Concept: POLYMORPHISM — Food gets 5% discount only if not expired
     * Organic food gets extra 2% discount.
     */
    @Override
    public double calculateDiscount() {
        if (expiryDate != null && expiryDate.isBefore(LocalDate.now())) {
            return 0; // no discount on expired food (business rule)
        }
        double discount = getPrice() * 0.05; // 5% base discount
        if (isOrganic) {
            discount += getPrice() * 0.02; // extra 2% for organic
        }
        return discount;
    }

    // Getters/Setters (Encapsulation)
    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

    public boolean isOrganic() { return isOrganic; }
    public void setOrganic(boolean organic) { isOrganic = organic; }

    public String getNutritionInfo() { return nutritionInfo; }
    public void setNutritionInfo(String nutritionInfo) { this.nutritionInfo = nutritionInfo; }

    public double getWeightKg() { return weightKg; }
    public void setWeightKg(double weightKg) { this.weightKg = weightKg; }

    public String getProductType() { return "FOOD"; }
}
