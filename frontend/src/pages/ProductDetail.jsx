import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { ShoppingCart, ArrowLeft, Package, Truck } from 'lucide-react';

const TYPE_BADGE_CLASS = { ELECTRONICS: 'badge-electronics', CLOTHING: 'badge-clothing', FOOD: 'badge-food' };

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    getProduct(id).then(r => setProduct(r.data)).catch(() => navigate('/products')).finally(() => setLoading(false));
  }, [id]);

  const handleAdd = async () => {
    if (!user) { toast.error('Please login first'); return; }
    await addToCart(product.id, qty);
    toast.success('Added to cart!');
  };

  if (loading) return <div className="page"><div className="spinner" /></div>;
  if (!product) return null;

  const discount = product.discountAmount;
  const oopNote = {
    ELECTRONICS: 'Electronics.calculateDiscount() → 10% off (Polymorphism)',
    CLOTHING: 'Clothing.calculateDiscount() → 20% off (Polymorphism)',
    FOOD: 'FoodProduct.calculateDiscount() → 5–7% off (Polymorphism)',
  }[product.type];

  return (
    <div className="page">
      <div className="container">
        <button className="btn btn-secondary btn-sm" style={{ marginBottom: 24, marginTop: 20 }} onClick={() => navigate(-1)}>
          <ArrowLeft size={15} /> Back
        </button>
        <div className="detail-layout">
          <div>
            <img
              src={product.imageUrl || `https://picsum.photos/seed/${id}/600/450`}
              alt={product.name}
              className="detail-img"
            />
          </div>
          <div>
            <span className={`product-type-badge ${TYPE_BADGE_CLASS[product.type]}`}>{product.type}</span>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 900, marginBottom: 8, letterSpacing: -0.5 }}>{product.name}</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>{product.description}</p>

            <div style={{ marginBottom: 24 }}>
              <div className="detail-price">
                ₹{product.finalPrice?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
                  <span className="detail-original">₹{product.price?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  <span className="product-discount-badge">{product.discountPercentage?.toFixed(0)}% OFF</span>
                  <span style={{ color: 'var(--green)', fontWeight: 600, fontSize: '0.9rem' }}>
                    Save ₹{discount?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              )}
            </div>

            {/* OOP Note */}
            <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: 12, padding: '14px 18px', marginBottom: 24 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-bright)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>OOP Concept</div>
              <code style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{oopNote}</code>
            </div>

            {/* Specs */}
            <div style={{ marginBottom: 28 }}>
              <div className="spec-row"><span className="spec-key">In Stock</span><span className="spec-value" style={{ color: product.stock > 0 ? 'var(--green)' : 'var(--red)' }}>{product.stock > 0 ? `${product.stock} units` : 'Out of stock'}</span></div>
              {product.brand && <div className="spec-row"><span className="spec-key">Brand</span><span className="spec-value">{product.brand}</span></div>}
              {product.warrantyMonths && <div className="spec-row"><span className="spec-key">Warranty</span><span className="spec-value">{product.warrantyMonths} months</span></div>}
              {product.size && <div className="spec-row"><span className="spec-key">Size</span><span className="spec-value">{product.size}</span></div>}
              {product.color && <div className="spec-row"><span className="spec-key">Color</span><span className="spec-value">{product.color}</span></div>}
              {product.material && <div className="spec-row"><span className="spec-key">Material</span><span className="spec-value">{product.material}</span></div>}
              {product.weightKg && <div className="spec-row"><span className="spec-key">Weight</span><span className="spec-value">{product.weightKg} kg</span></div>}
              {product.isOrganic !== null && product.isOrganic !== undefined && <div className="spec-row"><span className="spec-key">Organic</span><span className="spec-value">{product.isOrganic ? '✅ Yes' : '❌ No'}</span></div>}
              {product.shippingCost !== null && <div className="spec-row"><span className="spec-key"><Truck size={13} style={{display:'inline',marginRight:4}}/>Shipping</span><span className="spec-value">{product.eligibleForFreeShipping ? '🎉 Free Shipping' : `₹${product.shippingCost}`}</span></div>}
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="cart-quantity">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button className="btn btn-primary btn-lg" onClick={handleAdd} style={{ flex: 1 }}>
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
