package com.example.ecommerce.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

/**
 * JUnit Test: Clothing OOP class
 * Tests Polymorphism — calculateDiscount() returns 20% of price
 */
@DisplayName("Clothing Product Tests")
class ClothingTest {

    private Clothing clothing;

    @BeforeEach
    void setUp() {
        clothing = new Clothing("Test T-Shirt", 1000, 50, "A test shirt", "M", "Blue", "Cotton");
    }

    @Test
    @DisplayName("Clothing discount should be 20% of price")
    void testCalculateDiscount_TwentyPercent() {
        double expectedDiscount = 1000 * 0.20; // Rs 200
        assertEquals(expectedDiscount, clothing.calculateDiscount(), 0.001,
                "Clothing discount should be exactly 20%");
    }

    @Test
    @DisplayName("Clothing final price should be price minus 20% discount")
    void testGetFinalPrice() {
        double expectedFinalPrice = 1000 - (1000 * 0.20); // Rs 800
        assertEquals(expectedFinalPrice, clothing.getFinalPrice(), 0.001,
                "Final price should be original price minus 20% discount");
    }

    @Test
    @DisplayName("Clothing shipping cost should be Rs 50")
    void testShippingCost() {
        assertEquals(50.0, clothing.getShippingCost(), 0.001,
                "Clothing shipping cost should be Rs 50 (lightweight item)");
    }

    @Test
    @DisplayName("Clothing above Rs 2000 should be eligible for free shipping")
    void testFreeShippingEligibility_Above2000() {
        Clothing expensive = new Clothing("Designer Jacket", 5000, 10, "Jacket", "L", "Black", "Leather");
        assertTrue(expensive.isEligibleForFreeShipping(),
                "Clothing priced above Rs 2000 should be eligible for free shipping");
    }

    @Test
    @DisplayName("Clothing below Rs 2000 should not be eligible for free shipping")
    void testFreeShippingEligibility_Below2000() {
        assertFalse(clothing.isEligibleForFreeShipping(),
                "Clothing priced below Rs 2000 should NOT be eligible for free shipping");
    }

    @Test
    @DisplayName("Clothing discount is greater than Electronics discount for same price")
    void testPolymorphism_ClothingDiscountHigherThanElectronics() {
        // Same price, different types — POLYMORPHISM at work!
        Electronics electronics = new Electronics("Gadget", 1000, 5, "gadget", 6, "Brand");
        assertEquals(1000 * 0.20, clothing.calculateDiscount(), 0.001); // 20%
        assertEquals(1000 * 0.10, electronics.calculateDiscount(), 0.001); // 10%
        assertTrue(clothing.calculateDiscount() > electronics.calculateDiscount(),
                "Clothing discount should be higher than Electronics for same price (Polymorphism)");
    }

    @Test
    @DisplayName("Encapsulation: specific clothing fields work correctly")
    void testEncapsulation_ClothingFields() {
        assertEquals("M", clothing.getSize());
        assertEquals("Blue", clothing.getColor());
        assertEquals("Cotton", clothing.getMaterial());
        clothing.setGender("UNISEX");
        assertEquals("UNISEX", clothing.getGender());
    }
}
