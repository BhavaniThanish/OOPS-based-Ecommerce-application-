import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { placeOrder } from '../api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ShoppingCart, Trash2 } from 'lucide-react';

export default function Cart() {
  const { cart, loading, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [ordering, setOrdering] = useState(false);

  if (!user) return (
    <div className="page"><div className="container" style={{ paddingTop: 60 }}>
      <div className="empty-state">
        <div className="empty-icon">🔒</div>
        <div className="empty-title">Login Required</div>
        <div className="empty-subtitle">Please login to view your cart</div>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    </div></div>
  );

  if (loading) return <div className="page"><div className="spinner" /></div>;

  const items = cart?.items || [];

  if (items.length === 0) return (
    <div className="page"><div className="container" style={{ paddingTop: 60 }}>
      <div className="empty-state">
        <div className="empty-icon"><ShoppingCart size={64} style={{ opacity: 0.3 }} /></div>
        <div className="empty-title">Your cart is empty</div>
        <div className="empty-subtitle">Add some products to get started</div>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    </div></div>
  );

  const handleOrder = async () => {
    if (!address.trim()) { toast.error('Please enter shipping address'); return; }
    setOrdering(true);
    try {
      await placeOrder(address);
      toast.success('Order placed successfully! 🎉');
      navigate('/orders');
    } catch (e) {
      toast.error('Failed to place order');
    } finally {
      setOrdering(false);
    }
  };

  return (
    <div className="page">
      <div className="container" style={{ paddingTop: 40 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 32, letterSpacing: -0.5 }}>
          🛒 Shopping Cart <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: 400 }}>({items.length} items)</span>
        </h1>
        <div className="cart-layout">
          <div className="card">
            {items.map(item => (
              <div key={item.productId} className="cart-item">
                <img src={item.imageUrl || 'https://picsum.photos/100/80'} alt={item.productName} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.productName}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{item.productType}</div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 6 }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>₹{item.finalPrice?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    {item.price !== item.finalPrice && <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '0.85rem' }}>₹{item.price?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 10 }}>
                    <div className="cart-quantity">
                      <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>−</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={() => { removeFromCart(item.productId); toast.success('Removed!'); }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>
                    ₹{(item.finalPrice * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="order-summary">
              <h2 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 20 }}>Order Summary</h2>
              <div className="summary-row"><span className="summary-label">Original Total</span><span className="summary-value">₹{cart.totalOriginalPrice?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
              <div className="summary-row"><span className="summary-label">Discount</span><span className="summary-savings">−₹{cart.totalSavings?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
              <hr className="divider" />
              <div className="summary-row">
                <span className="summary-label summary-total">Total</span>
                <span className="summary-value summary-total">₹{cart.totalPrice?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <div style={{ marginTop: 20 }}>
                <label className="form-label">Shipping Address</label>
                <textarea className="form-input" rows={3} placeholder="Enter delivery address..."
                  value={address} onChange={e => setAddress(e.target.value)}
                  style={{ resize: 'vertical' }} />
              </div>
              <button className="btn btn-primary w-full" style={{ marginTop: 16, justifyContent: 'center', padding: 14 }}
                onClick={handleOrder} disabled={ordering}>
                {ordering ? 'Placing Order...' : '🎉 Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
