package com.example.ecommerce.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * MongoDB-compatible Product document.
 * Stores all product types in one collection with a "type" discriminator.
 * The OOP hierarchy (Electronics, Clothing, FoodProduct) is used for business logic,
 * while this class handles persistence.
 */
@Document(collection = "products")
public class Product {

    @Id
    private String id;
    private String type; // ELECTRONICS, CLOTHING, FOOD
    private String name;
    private double price;
    private double finalPrice;
    private double discountAmount;
    private double discountPercentage;
    private String category;
    private int stock;
    private String imageUrl;
    private String description;

    // Electronics fields
    private Integer warrantyMonths;
    private String brand;
    private String modelNumber;

    // Clothing fields
    private String size;
    private String color;
    private String material;
    private String gender;

    // Food fields
    private Boolean isOrganic;
    private Double weightKg;
    private String nutritionInfo;
    private String expiryDate;

    // Shipping
    private Double shippingCost;
    private Boolean eligibleForFreeShipping;

    public Product() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getFinalPrice() { return finalPrice; }
    public void setFinalPrice(double finalPrice) { this.finalPrice = finalPrice; }

    public double getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(double discountAmount) { this.discountAmount = discountAmount; }

    public double getDiscountPercentage() { return discountPercentage; }
    public void setDiscountPercentage(double discountPercentage) { this.discountPercentage = discountPercentage; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getWarrantyMonths() { return warrantyMonths; }
    public void setWarrantyMonths(Integer warrantyMonths) { this.warrantyMonths = warrantyMonths; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModelNumber() { return modelNumber; }
    public void setModelNumber(String modelNumber) { this.modelNumber = modelNumber; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Boolean getIsOrganic() { return isOrganic; }
    public void setIsOrganic(Boolean isOrganic) { this.isOrganic = isOrganic; }

    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double weightKg) { this.weightKg = weightKg; }

    public String getNutritionInfo() { return nutritionInfo; }
    public void setNutritionInfo(String nutritionInfo) { this.nutritionInfo = nutritionInfo; }

    public String getExpiryDate() { return expiryDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }

    public Double getShippingCost() { return shippingCost; }
    public void setShippingCost(Double shippingCost) { this.shippingCost = shippingCost; }

    public Boolean getEligibleForFreeShipping() { return eligibleForFreeShipping; }
    public void setEligibleForFreeShipping(Boolean eligibleForFreeShipping) {
        this.eligibleForFreeShipping = eligibleForFreeShipping;
    }
}
