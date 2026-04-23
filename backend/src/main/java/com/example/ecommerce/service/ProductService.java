package com.example.ecommerce.service;

import com.example.ecommerce.factory.ProductFactory;
import com.example.ecommerce.interfaces.Shippable;
import com.example.ecommerce.model.*;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * ProductService uses the Factory Pattern and OOP hierarchy to manage products.
 * It demonstrates Polymorphism in action: calculateDiscount() returns different
 * values for Electronics, Clothing, and FoodProduct.
 */
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    /**
     * Create a product using the Factory Pattern + Polymorphism.
     * The correct subclass is created, discount is calculated polymorphically,
     * and the result is persisted as a unified Product document.
     */
    public Product createProduct(Product productRequest) {
        // Use Factory Pattern to get the correct OOP subclass
        BaseProduct oopProduct = ProductFactory.createProduct(productRequest.getType());

        // Set common fields (Polymorphism — all share the same interface)
        oopProduct.setName(productRequest.getName());
        oopProduct.setPrice(productRequest.getPrice());
        oopProduct.setStock(productRequest.getStock());
        oopProduct.setDescription(productRequest.getDescription());
        oopProduct.setImageUrl(productRequest.getImageUrl());
        oopProduct.setCategory(productRequest.getType());

        // Apply type-specific fields
        applySpecificFields(oopProduct, productRequest);

        // Calculate discount POLYMORPHICALLY — each type returns different value
        double discount = oopProduct.calculateDiscount();
        double finalPrice = oopProduct.getFinalPrice();

        // Build the Product document for MongoDB
        productRequest.setDiscountAmount(discount);
        productRequest.setFinalPrice(finalPrice);
        productRequest.setDiscountPercentage((discount / productRequest.getPrice()) * 100);

        // Handle Shippable interface
        if (oopProduct instanceof Shippable shippable) {
            productRequest.setShippingCost(shippable.getShippingCost());
            productRequest.setEligibleForFreeShipping(shippable.isEligibleForFreeShipping());
        }

        return productRepository.save(productRequest);
    }

    private void applySpecificFields(BaseProduct oopProduct, Product request) {
        switch (request.getType().toUpperCase()) {
            case "ELECTRONICS" -> {
                Electronics e = (Electronics) oopProduct;
                if (request.getWarrantyMonths() != null) e.setWarrantyMonths(request.getWarrantyMonths());
                if (request.getBrand() != null) e.setBrand(request.getBrand());
            }
            case "CLOTHING" -> {
                Clothing c = (Clothing) oopProduct;
                if (request.getSize() != null) c.setSize(request.getSize());
                if (request.getColor() != null) c.setColor(request.getColor());
                if (request.getMaterial() != null) c.setMaterial(request.getMaterial());
            }
            case "FOOD" -> {
                FoodProduct f = (FoodProduct) oopProduct;
                if (request.getIsOrganic() != null) f.setOrganic(request.getIsOrganic());
                if (request.getWeightKg() != null) f.setWeightKg(request.getWeightKg());
            }
        }
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByType(String type) {
        return productRepository.findByType(type.toUpperCase());
    }

    public List<Product> searchProducts(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public Product updateProduct(String id, Product updated) {
        return productRepository.findById(id).map(existing -> {
            updated.setId(existing.getId());
            // Recalculate discount polymorphically
            BaseProduct oopProduct = ProductFactory.createProduct(updated.getType());
            oopProduct.setPrice(updated.getPrice());
            double discount = oopProduct.calculateDiscount();
            updated.setDiscountAmount(discount);
            updated.setFinalPrice(updated.getPrice() - discount);
            updated.setDiscountPercentage((discount / updated.getPrice()) * 100);
            return productRepository.save(updated);
        }).orElseThrow(() -> new RuntimeException("Product not found: " + id));
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public void seedSampleProducts() {
        if (productRepository.count() > 0) return;

        // Electronics (10% discount)
        Product laptop = new Product();
        laptop.setType("ELECTRONICS"); laptop.setName("MacBook Pro 14\"");
        laptop.setPrice(125000); laptop.setStock(10);
        laptop.setDescription("Apple M3 Pro chip, 18GB RAM, 512GB SSD");
        laptop.setBrand("Apple"); laptop.setWarrantyMonths(12);
        laptop.setImageUrl("https://picsum.photos/seed/laptop/400/300");
        createProduct(laptop);

        Product phone = new Product();
        phone.setType("ELECTRONICS"); phone.setName("Samsung Galaxy S24");
        phone.setPrice(79999); phone.setStock(25);
        phone.setDescription("6.2\" AMOLED, 50MP camera, 5000mAh battery");
        phone.setBrand("Samsung"); phone.setWarrantyMonths(12);
        phone.setImageUrl("https://picsum.photos/seed/phone/400/300");
        createProduct(phone);

        // Clothing (20% discount)
        Product tshirt = new Product();
        tshirt.setType("CLOTHING"); tshirt.setName("Premium Cotton T-Shirt");
        tshirt.setPrice(1299); tshirt.setStock(50);
        tshirt.setDescription("100% organic cotton, breathable fabric");
        tshirt.setSize("M"); tshirt.setColor("Navy Blue"); tshirt.setMaterial("Cotton");
        tshirt.setImageUrl("https://picsum.photos/seed/tshirt/400/300");
        createProduct(tshirt);

        Product jacket = new Product();
        jacket.setType("CLOTHING"); jacket.setName("Winter Jacket");
        jacket.setPrice(3499); jacket.setStock(30);
        jacket.setDescription("Waterproof shell, thermal lining, windproof");
        jacket.setSize("L"); jacket.setColor("Black"); jacket.setMaterial("Polyester");
        jacket.setImageUrl("https://picsum.photos/seed/jacket/400/300");
        createProduct(jacket);

        // Food (5-7% discount)
        Product almonds = new Product();
        almonds.setType("FOOD"); almonds.setName("Organic California Almonds");
        almonds.setPrice(899); almonds.setStock(100);
        almonds.setDescription("Raw, unprocessed premium California almonds");
        almonds.setIsOrganic(true); almonds.setWeightKg(0.5);
        almonds.setImageUrl("https://picsum.photos/seed/almonds/400/300");
        createProduct(almonds);

        Product coffee = new Product();
        coffee.setType("FOOD"); coffee.setName("Arabica Coffee Beans");
        coffee.setPrice(599); coffee.setStock(75);
        coffee.setDescription("Single origin Ethiopian Arabica, medium roast");
        coffee.setIsOrganic(false); coffee.setWeightKg(0.25);
        coffee.setImageUrl("https://picsum.photos/seed/coffee/400/300");
        createProduct(coffee);
    }
}
