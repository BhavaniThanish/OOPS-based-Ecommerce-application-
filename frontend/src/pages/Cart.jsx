import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { placeOrder } from '../api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

export default function Cart() {
  const { cart, loading, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [ordering, setOrdering] = useState(false);

  if (!user) return (
    <div className="page">
      <div className="container" style={{ paddingTop: 60 }}>
        <div className="empty-state">
          <span className="empty-icon">🔒</span>
          <div className="empty-title">Login Required</div>
          <p className="empty-sub">Please login to view your cart</p>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="page"><div className="spinner" /></div>;
  const items = cart?.items || [];

  if (items.length === 0) return (
    <div className="page">
      <div className="container" style={{ paddingTop: 60 }}>
        <div className="empty-state">
          <span className="empty-icon">🛒</span>
          <div className="empty-title">Your Cart is Empty</div>
          <p className="empty-sub">Add some products to get started</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    </div>
  );

  const handleOrder = async () => {
    if (!address.trim()) { toast.error('Please enter a shipping address'); return; }
    setOrdering(true);
    try {
      await placeOrder(address);
      toast.success('Order placed! 🎉');
      navigate('/orders');
    } catch {
      toast.error('Failed to place order');
    } finally { setOrdering(false); }
  };

  return (
    <div className="page">
      {/* Header */}
      <div style={{ background: 'var(--charcoal)', paddingTop: 64, paddingBottom: 40 }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', color: 'white', lineHeight: 1, letterSpacing: '-0.01em' }}>
            Shopping Cart
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8, fontSize: '0.88rem' }}>
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className="cart-layout">
          {/* Items table */}
          <div>
            <div className="cart-table">
              <div className="cart-table-head">
                <span>Product</span>
                <span>Unit Price</span>
                <span>Quantity</span>
                <span>Total</span>
                <span></span>
              </div>
              {items.map(item => (
                <div key={item.productId} className="cart-row">
                  <div className="cart-item-info">
                    <img src={item.imageUrl || 'https://picsum.photos/seed/cart/70/56'} alt={item.productName} className="cart-item-img" />
                    <div>
                      <div className="cart-item-name">{item.productName}</div>
                      <div className="cart-item-type">{item.productType}</div>
                      {item.price !== item.finalPrice && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--forest-mid)', fontWeight: 700 }}>
                          {((1 - item.finalPrice / item.price) * 100).toFixed(0)}% OOP Discount Applied
                        </div>
                      )}
                    </div>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--charcoal)' }}>
                    ₹{item.finalPrice?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                  <div className="cart-quantity">
                    <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                  </div>
                  <span style={{ fontWeight: 800, fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.2rem' }}>
                    ₹{(item.finalPrice * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                  <button className="btn btn-danger btn-sm" onClick={() => { removeFromCart(item.productId); toast.success('Removed'); }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16 }}>
              <Link to="/products" className="btn btn-outline btn-sm">← Continue Shopping</Link>
            </div>
          </div>

          {/* Summary */}
          <div className="order-summary">
            <div className="summary-title">Order Summary</div>
            <div className="summary-row">
              <span className="summary-label">Original Total</span>
              <span className="summary-value">₹{cart.totalOriginalPrice?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">OOP Discounts</span>
              <span className="summary-savings">−₹{cart.totalSavings?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <hr className="divider" />
            <div className="summary-row" style={{ marginBottom: 24 }}>
              <span className="summary-label" style={{ color: 'white', fontWeight: 700 }}>Total</span>
              <span className="summary-total">₹{cart.totalPrice?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                Shipping Address
              </label>
              <textarea
                style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', borderRadius: '2px', resize: 'vertical' }}
                rows={3} placeholder="Enter delivery address..."
                value={address} onChange={e => setAddress(e.target.value)}
              />
            </div>

            <button className="btn btn-gold w-full btn-lg" onClick={handleOrder} disabled={ordering}>
              {ordering ? 'Placing Order...' : 'Place Order →'}
            </button>

            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', letterSpacing: '0.07em', textAlign: 'center', marginTop: 14 }}>
              POLYMORPHIC DISCOUNTS APPLIED AUTOMATICALLY
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
