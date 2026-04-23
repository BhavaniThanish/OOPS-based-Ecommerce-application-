package com.example.ecommerce.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

/**
 * JUnit Test: FoodProduct OOP class
 * Tests Polymorphism — calculateDiscount() returns 5% (or 7% organic)
 */
@DisplayName("FoodProduct Tests")
class FoodProductTest {

    private FoodProduct regularFood;
    private FoodProduct organicFood;

    @BeforeEach
    void setUp() {
        regularFood = new FoodProduct("Regular Rice", 200, 100, "Basmati Rice", false, 1.0);
        organicFood = new FoodProduct("Organic Almonds", 500, 50, "Organic almonds", true, 0.5);
    }

    @Test
    @DisplayName("Regular food discount should be 5% of price")
    void testCalculateDiscount_RegularFood() {
        double expectedDiscount = 200 * 0.05; // Rs 10
        assertEquals(expectedDiscount, regularFood.calculateDiscount(), 0.001,
                "Regular food discount should be exactly 5%");
    }

    @Test
    @DisplayName("Organic food discount should be 7% of price (5% + 2% organic bonus)")
    void testCalculateDiscount_OrganicFood() {
        double expectedDiscount = 500 * 0.07; // Rs 35 (5% + 2%)
        assertEquals(expectedDiscount, organicFood.calculateDiscount(), 0.001,
                "Organic food should get 7% discount (5% base + 2% organic bonus)");
    }

    @Test
    @DisplayName("Expired food should have zero discount")
    void testCalculateDiscount_ExpiredFood() {
        FoodProduct expired = new FoodProduct("Expired Milk", 100, 10, "Old milk", false, 1.0);
        expired.setExpiryDate(LocalDate.now().minusDays(1)); // yesterday = expired
        assertEquals(0, expired.calculateDiscount(), 0.001,
                "Expired food should have 0 discount");
    }

    @Test
    @DisplayName("Food with future expiry should get normal discount")
    void testCalculateDiscount_FreshFood() {
        regularFood.setExpiryDate(LocalDate.now().plusDays(30));
        assertEquals(200 * 0.05, regularFood.calculateDiscount(), 0.001,
                "Fresh food should still get 5% discount");
    }

    @Test
    @DisplayName("Organic food gets higher discount than regular food for same price")
    void testPolymorphism_OrganicVsRegular() {
        FoodProduct regular = new FoodProduct("Rice", 500, 100, "Rice", false, 1.0);
        assertEquals(500 * 0.05, regular.calculateDiscount(), 0.001);        // 5%
        assertEquals(500 * 0.07, organicFood.calculateDiscount(), 0.001);    // 7%
        assertTrue(organicFood.calculateDiscount() > regular.calculateDiscount(),
                "Organic food should have higher discount than regular food");
    }

    @Test
    @DisplayName("Encapsulation: food specific fields work correctly")
    void testEncapsulation_FoodFields() {
        assertTrue(organicFood.isOrganic());
        assertFalse(regularFood.isOrganic());
        assertEquals(0.5, organicFood.getWeightKg(), 0.001);
        regularFood.setNutritionInfo("Calories: 350, Protein: 7g");
        assertEquals("Calories: 350, Protein: 7g", regularFood.getNutritionInfo());
    }
}
