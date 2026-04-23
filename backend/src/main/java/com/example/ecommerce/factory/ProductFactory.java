package com.example.ecommerce.factory;

import com.example.ecommerce.model.*;

/**
 * OOP Concept: DESIGN PATTERN — Factory Pattern
 *
 * The ProductFactory is responsible for creating the correct product
 * subclass based on the type string. This decouples product creation
 * from business logic and demonstrates the Factory Design Pattern.
 *
 * Usage:
 *   BaseProduct product = ProductFactory.createProduct("ELECTRONICS");
 */
public class ProductFactory {

    /**
     * Factory method — creates correct product type based on input.
     * OOP: Demonstrates Polymorphism — the returned BaseProduct behaves
     *      differently depending on which subclass is instantiated.
     *
     * @param type product type: ELECTRONICS, CLOTHING, or FOOD
     * @return appropriate BaseProduct subclass instance
     */
    public static BaseProduct createProduct(String type) {
        return switch (type.toUpperCase()) {
            case "ELECTRONICS" -> new Electronics();
            case "CLOTHING"    -> new Clothing();
            case "FOOD"        -> new FoodProduct();
            default -> throw new IllegalArgumentException(
                "Unknown product type: " + type +
                ". Valid types are: ELECTRONICS, CLOTHING, FOOD"
            );
        };
    }

    /**
     * Creates a product with basic attributes pre-filled.
     * Overloaded factory method — demonstrates Method Overloading.
     */
    public static BaseProduct createProduct(String type, String name, double price,
                                            int stock, String description) {
        BaseProduct product = createProduct(type);
        product.setName(name);
        product.setPrice(price);
        product.setStock(stock);
        product.setDescription(description);
        product.setCategory(type);
        return product;
    }
}
