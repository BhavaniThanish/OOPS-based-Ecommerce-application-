import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProduct } from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { ChevronRight } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    getProduct(id)
      .then(r => setProduct(r.data))
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = async () => {
    if (!user) { toast.error('Please login first'); return; }
    await addToCart(product.id, qty);
    toast.success('Added to cart!');
  };

  if (loading) return <div className="page"><div className="spinner" /></div>;
  if (!product) return null;

  const oopNotes = {
    ELECTRONICS: 'Electronics.calculateDiscount() → returns 10% of price',
    CLOTHING: 'Clothing.calculateDiscount() → returns 20% of price',
    FOOD: 'FoodProduct.calculateDiscount() → returns 5% base + 2% if organic',
  };

  const specs = [
    { key: 'Type', val: product.type },
    { key: 'Stock', val: product.stock > 0 ? `${product.stock} units available` : 'Out of stock' },
    product.brand && { key: 'Brand', val: product.brand },
    product.warrantyMonths && { key: 'Warranty', val: `${product.warrantyMonths} months` },
    product.size && { key: 'Size', val: product.size },
    product.color && { key: 'Color', val: product.color },
    product.material && { key: 'Material', val: product.material },
    product.weightKg && { key: 'Weight', val: `${product.weightKg} kg` },
    product.isOrganic !== null && product.isOrganic !== undefined && { key: 'Organic', val: product.isOrganic ? 'Yes (+2% extra discount)' : 'No' },
    product.shippingCost !== null && { key: 'Shipping', val: product.eligibleForFreeShipping ? 'Free Shipping' : `₹${product.shippingCost}` },
  ].filter(Boolean);

  return (
    <div className="page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="detail-breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={12} />
          <Link to="/products">Products</Link>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--charcoal)', fontWeight: 600 }}>{product.name}</span>
        </div>

        <div className="detail-layout">
          {/* Image */}
          <div className="detail-img-wrap">
            <img
              src={product.imageUrl || `https://picsum.photos/seed/${id}/700/500`}
              alt={product.name}
              className="detail-img"
            />
          </div>

          {/* Info */}
          <div>
            <span className="detail-category-tag">{product.type}</span>
            <h1 className="detail-title">{product.name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 24 }}>
              {product.description}
            </p>

            {/* Price */}
            <div style={{ marginBottom: 4 }}>
              <div className="detail-price">
                ₹{product.finalPrice?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
              {product.discountAmount > 0 && (
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
                  <span className="detail-original">₹{product.price?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  <span className="product-discount-badge">Save {product.discountPercentage?.toFixed(0)}%</span>
                  <span style={{ color: 'var(--forest-mid)', fontWeight: 700, fontSize: '0.88rem' }}>
                    You save ₹{product.discountAmount?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              )}
            </div>

            {/* OOP Concept Tag */}
            <div className="oop-tag">
              <div className="oop-tag-label">OOP Concept — Polymorphism</div>
              <div className="oop-tag-code">{oopNotes[product.type]}</div>
            </div>

            {/* Specs */}
            <table className="spec-table">
              <tbody>
                {specs.map(s => (
                  <tr key={s.key}>
                    <td className="spec-key">{s.key}</td>
                    <td className="spec-val">{s.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Quantity + Add */}
            <div className="qty-add-row">
              <div className="cart-quantity">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-value" style={{ minWidth: 32, textAlign: 'center', fontSize: '1rem', fontWeight: 800 }}>{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button className="btn btn-primary btn-lg" onClick={handleAdd} style={{ flex: 1 }}>
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
