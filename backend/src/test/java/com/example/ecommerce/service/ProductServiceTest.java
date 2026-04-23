package com.example.ecommerce.service;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * JUnit + Mockito Test: ProductService
 * Tests CRUD operations using mocked repository.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("ProductService Tests with Mockito")
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product electronicProduct;
    private Product clothingProduct;

    @BeforeEach
    void setUp() {
        electronicProduct = new Product();
        electronicProduct.setId("elec-001");
        electronicProduct.setType("ELECTRONICS");
        electronicProduct.setName("Test Laptop");
        electronicProduct.setPrice(50000);
        electronicProduct.setStock(10);
        electronicProduct.setDescription("Test laptop description");

        clothingProduct = new Product();
        clothingProduct.setId("cloth-001");
        clothingProduct.setType("CLOTHING");
        clothingProduct.setName("Test Shirt");
        clothingProduct.setPrice(1000);
        clothingProduct.setStock(50);
        clothingProduct.setDescription("Test shirt description");
    }

    @Test
    @DisplayName("createProduct should calculate 10% discount for Electronics")
    void testCreateProduct_Electronics_CalculatesDiscount() {
        when(productRepository.save(any(Product.class))).thenAnswer(inv -> inv.getArgument(0));

        Product result = productService.createProduct(electronicProduct);

        assertEquals(50000 * 0.10, result.getDiscountAmount(), 0.001,
                "Electronics discount should be 10%");
        assertEquals(50000 - (50000 * 0.10), result.getFinalPrice(), 0.001,
                "Final price should be correctly calculated");
        assertEquals(10.0, result.getDiscountPercentage(), 0.001);
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    @DisplayName("createProduct should calculate 20% discount for Clothing")
    void testCreateProduct_Clothing_CalculatesDiscount() {
        when(productRepository.save(any(Product.class))).thenAnswer(inv -> inv.getArgument(0));

        Product result = productService.createProduct(clothingProduct);

        assertEquals(1000 * 0.20, result.getDiscountAmount(), 0.001,
                "Clothing discount should be 20%");
        assertEquals(1000 - (1000 * 0.20), result.getFinalPrice(), 0.001);
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    @DisplayName("getAllProducts should return all products from repository")
    void testGetAllProducts() {
        when(productRepository.findAll()).thenReturn(List.of(electronicProduct, clothingProduct));

        List<Product> products = productService.getAllProducts();

        assertEquals(2, products.size());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("getProductsByType should filter by type")
    void testGetProductsByType() {
        when(productRepository.findByType("ELECTRONICS")).thenReturn(List.of(electronicProduct));

        List<Product> result = productService.getProductsByType("ELECTRONICS");

        assertEquals(1, result.size());
        assertEquals("ELECTRONICS", result.get(0).getType());
        verify(productRepository).findByType("ELECTRONICS");
    }

    @Test
    @DisplayName("getProductById should return product when found")
    void testGetProductById_Found() {
        when(productRepository.findById("elec-001")).thenReturn(Optional.of(electronicProduct));

        Optional<Product> result = productService.getProductById("elec-001");

        assertTrue(result.isPresent());
        assertEquals("Test Laptop", result.get().getName());
    }

    @Test
    @DisplayName("getProductById should return empty when not found")
    void testGetProductById_NotFound() {
        when(productRepository.findById(anyString())).thenReturn(Optional.empty());

        Optional<Product> result = productService.getProductById("nonexistent");

        assertFalse(result.isPresent());
    }

    @Test
    @DisplayName("deleteProduct should call repository delete")
    void testDeleteProduct() {
        doNothing().when(productRepository).deleteById(anyString());

        productService.deleteProduct("elec-001");

        verify(productRepository, times(1)).deleteById("elec-001");
    }

    @Test
    @DisplayName("searchProducts should call repository search")
    void testSearchProducts() {
        when(productRepository.findByNameContainingIgnoreCase("laptop"))
                .thenReturn(List.of(electronicProduct));

        List<Product> results = productService.searchProducts("laptop");

        assertEquals(1, results.size());
        verify(productRepository).findByNameContainingIgnoreCase("laptop");
    }
}
