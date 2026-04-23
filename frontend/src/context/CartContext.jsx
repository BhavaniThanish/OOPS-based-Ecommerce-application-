import { createContext, useContext, useState, useEffect } from 'react';
import { getCart as fetchCart, addToCart as apiAdd, removeFromCart as apiRemove, updateCartQty } from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await fetchCart();
      setCart(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCart(); }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    const res = await apiAdd(productId, quantity);
    setCart(res.data);
  };

  const removeFromCart = async (productId) => {
    const res = await apiRemove(productId);
    setCart(res.data);
  };

  const updateQuantity = async (productId, quantity) => {
    const res = await updateCartQty(productId, quantity);
    setCart(res.data);
  };

  const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loading, cartCount, addToCart, removeFromCart, updateQuantity, loadCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
