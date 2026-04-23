package com.example.ecommerce.interfaces;

/**
 * OOP Concept: Interface (Abstraction)
 * Products implementing this interface must provide shipping cost logic.
 */
public interface Shippable {
    double getShippingCost();
    boolean isEligibleForFreeShipping();
}
