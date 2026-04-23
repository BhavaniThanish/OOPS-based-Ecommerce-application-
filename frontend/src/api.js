import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Products
export const getProducts = (params) => API.get('/products', { params });
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const seedProducts = () => API.post('/products/seed');

// Auth
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const getMe = () => API.get('/auth/me');

// Cart
export const getCart = () => API.get('/cart');
export const addToCart = (productId, quantity = 1) => API.post('/cart/add', { productId, quantity });
export const removeFromCart = (productId) => API.delete(`/cart/remove/${productId}`);
export const updateCartQty = (productId, quantity) => API.put(`/cart/update/${productId}`, { quantity });
export const clearCart = () => API.delete('/cart/clear');

// Orders
export const placeOrder = (shippingAddress) => API.post('/orders/place', { shippingAddress });
export const getMyOrders = () => API.get('/orders/my');
export const getAllOrders = () => API.get('/orders/all');

export default API;
