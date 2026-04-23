package com.example.ecommerce.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

/**
 * JUnit Test: Electronics OOP class
 * Tests Polymorphism — calculateDiscount() returns 10% of price
 */
@DisplayName("Electronics Product Tests")
class ElectronicsTest {

    private Electronics electronics;

    @BeforeEach
    void setUp() {
        electronics = new Electronics("Test Laptop", 50000, 10, "A test laptop", 12, "TestBrand");
    }

    @Test
    @DisplayName("Electronics discount should be 10% of price")
    void testCalculateDiscount_TenPercent() {
        double expectedDiscount = 50000 * 0.10; // Rs 5000
        assertEquals(expectedDiscount, electronics.calculateDiscount(), 0.001,
                "Electronics discount should be exactly 10%");
    }

    @Test
    @DisplayName("Electronics final price should be price minus 10% discount")
    void testGetFinalPrice() {
        double expectedFinalPrice = 50000 - (50000 * 0.10); // Rs 45000
        assertEquals(expectedFinalPrice, electronics.getFinalPrice(), 0.001,
                "Final price should be original price minus 10% discount");
    }

    @Test
    @DisplayName("Electronics shipping cost should be Rs 100")
    void testShippingCost() {
        assertEquals(100.0, electronics.getShippingCost(), 0.001,
                "Electronics shipping cost should be Rs 100 (heavy item)");
    }

    @Test
    @DisplayName("Electronics above Rs 10000 should be eligible for free shipping")
    void testFreeShippingEligibility_Above10000() {
        assertTrue(electronics.isEligibleForFreeShipping(),
                "Electronics priced above Rs 10000 should be eligible for free shipping");
    }

    @Test
    @DisplayName("Electronics below Rs 10000 should not be eligible for free shipping")
    void testFreeShippingEligibility_Below10000() {
        Electronics cheapElectronics = new Electronics("Earphones", 999, 50, "Earphones", 6, "Brand");
        assertFalse(cheapElectronics.isEligibleForFreeShipping(),
                "Electronics priced below Rs 10000 should NOT be eligible for free shipping");
    }

    @Test
    @DisplayName("Electronics should have correct product type")
    void testProductType() {
        assertEquals("ELECTRONICS", electronics.getProductType());
    }

    @Test
    @DisplayName("Encapsulation: getters should return correct values")
    void testEncapsulation_Getters() {
        assertEquals("Test Laptop", electronics.getName());
        assertEquals(50000, electronics.getPrice(), 0.001);
        assertEquals(10, electronics.getStock());
        assertEquals(12, electronics.getWarrantyMonths());
        assertEquals("TestBrand", electronics.getBrand());
    }

    @Test
    @DisplayName("Encapsulation: setters should update values")
    void testEncapsulation_Setters() {
        electronics.setPrice(75000);
        electronics.setWarrantyMonths(24);
        assertEquals(75000, electronics.getPrice(), 0.001);
        assertEquals(24, electronics.getWarrantyMonths());
        // Discount recalculates based on new price
        assertEquals(75000 * 0.10, electronics.calculateDiscount(), 0.001);
    }
}
