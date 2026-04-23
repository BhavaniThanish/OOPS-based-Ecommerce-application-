package com.example.ecommerce.interfaces;

/**
 * OOP Concept: Interface (Abstraction)
 * Any product implementing this interface must provide discount logic.
 */
public interface Discountable {
    double calculateDiscount();
    double getFinalPrice();
}
