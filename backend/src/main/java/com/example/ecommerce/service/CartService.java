package com.example.ecommerce.service;

import com.example.ecommerce.model.Cart;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart getCart(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(new Cart(userId)));
    }

    public Cart addToCart(String userId, String productId, int quantity) {
        Cart cart = getCart(userId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

        // Check if item already in cart
        boolean exists = cart.getItems().stream()
                .anyMatch(item -> item.getProductId().equals(productId));

        if (exists) {
            cart.getItems().forEach(item -> {
                if (item.getProductId().equals(productId)) {
                    item.setQuantity(item.getQuantity() + quantity);
                }
            });
        } else {
            Cart.CartItem cartItem = new Cart.CartItem();
            cartItem.setProductId(product.getId());
            cartItem.setProductName(product.getName());
            cartItem.setProductType(product.getType());
            cartItem.setPrice(product.getPrice());
            cartItem.setFinalPrice(product.getFinalPrice());
            cartItem.setQuantity(quantity);
            cartItem.setImageUrl(product.getImageUrl());
            cart.getItems().add(cartItem);
        }

        return cartRepository.save(cart);
    }

    public Cart removeFromCart(String userId, String productId) {
        Cart cart = getCart(userId);
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        return cartRepository.save(cart);
    }

    public Cart updateQuantity(String userId, String productId, int quantity) {
        Cart cart = getCart(userId);
        if (quantity <= 0) {
            return removeFromCart(userId, productId);
        }
        cart.getItems().forEach(item -> {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(quantity);
            }
        });
        return cartRepository.save(cart);
    }

    public Cart clearCart(String userId) {
        Cart cart = getCart(userId);
        cart.getItems().clear();
        return cartRepository.save(cart);
    }
}
