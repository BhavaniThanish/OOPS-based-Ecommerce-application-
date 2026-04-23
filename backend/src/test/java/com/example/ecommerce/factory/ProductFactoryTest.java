package com.example.ecommerce.factory;

import com.example.ecommerce.model.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

/**
 * JUnit Test: ProductFactory — Factory Design Pattern
 * Tests that the factory correctly creates the right product subclass.
 */
@DisplayName("ProductFactory Design Pattern Tests")
class ProductFactoryTest {

    @Test
    @DisplayName("Factory should create Electronics instance for 'ELECTRONICS' type")
    void testCreateProduct_Electronics() {
        BaseProduct product = ProductFactory.createProduct("ELECTRONICS");
        assertNotNull(product, "Product should not be null");
        assertInstanceOf(Electronics.class, product,
                "Factory should create Electronics instance for type 'ELECTRONICS'");
    }

    @Test
    @DisplayName("Factory should create Clothing instance for 'CLOTHING' type")
    void testCreateProduct_Clothing() {
        BaseProduct product = ProductFactory.createProduct("CLOTHING");
        assertNotNull(product);
        assertInstanceOf(Clothing.class, product,
                "Factory should create Clothing instance for type 'CLOTHING'");
    }

    @Test
    @DisplayName("Factory should create FoodProduct instance for 'FOOD' type")
    void testCreateProduct_FoodProduct() {
        BaseProduct product = ProductFactory.createProduct("FOOD");
        assertNotNull(product);
        assertInstanceOf(FoodProduct.class, product,
                "Factory should create FoodProduct instance for type 'FOOD'");
    }

    @Test
    @DisplayName("Factory should be case-insensitive")
    void testCreateProduct_CaseInsensitive() {
        assertInstanceOf(Electronics.class, ProductFactory.createProduct("electronics"));
        assertInstanceOf(Clothing.class, ProductFactory.createProduct("clothing"));
        assertInstanceOf(FoodProduct.class, ProductFactory.createProduct("food"));
    }

    @Test
    @DisplayName("Factory should throw exception for unknown type")
    void testCreateProduct_UnknownType_ThrowsException() {
        assertThrows(IllegalArgumentException.class,
                () -> ProductFactory.createProduct("FURNITURE"),
                "Factory should throw IllegalArgumentException for unknown product type");
    }

    @Test
    @DisplayName("Factory overload: Creates product with basic attributes pre-filled")
    void testCreateProduct_WithAttributes() {
        BaseProduct product = ProductFactory.createProduct(
                "ELECTRONICS", "Test Phone", 15000, 20, "A test phone");
        assertInstanceOf(Electronics.class, product);
        assertEquals("Test Phone", product.getName());
        assertEquals(15000, product.getPrice(), 0.001);
        assertEquals(20, product.getStock());
    }

    @Test
    @DisplayName("Polymorphism: Same factory call, different discount behavior")
    void testPolymorphism_ThroughFactory() {
        BaseProduct electronics = ProductFactory.createProduct("ELECTRONICS", "Laptop", 10000, 5, "desc");
        BaseProduct clothing = ProductFactory.createProduct("CLOTHING", "Shirt", 10000, 50, "desc");
        BaseProduct food = ProductFactory.createProduct("FOOD", "Rice", 10000, 100, "desc");

        // Same price, different discount amounts — POLYMORPHISM!
        assertEquals(10000 * 0.10, electronics.calculateDiscount(), 0.001); // 10%
        assertEquals(10000 * 0.20, clothing.calculateDiscount(), 0.001);    // 20%
        assertEquals(10000 * 0.05, food.calculateDiscount(), 0.001);        // 5%

        // Verify they're all different
        assertNotEquals(electronics.calculateDiscount(), clothing.calculateDiscount());
        assertNotEquals(clothing.calculateDiscount(), food.calculateDiscount());
    }
}
