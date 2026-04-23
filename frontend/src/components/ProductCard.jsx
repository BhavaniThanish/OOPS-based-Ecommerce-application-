import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

const TYPE_LABELS = { ELECTRONICS: 'Electronics', CLOTHING: 'Clothing', FOOD: 'Food' };
const TYPE_BADGE_CLASS = { ELECTRONICS: 'badge-electronics', CLOTHING: 'badge-clothing', FOOD: 'badge-food' };

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to add items to cart'); return; }
    try {
      await addToCart(product.id, 1);
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error('Failed to add to cart');
    }
  };

  const discountPct = product.discountPercentage?.toFixed(0);

  return (
    <Link to={`/products/${product.id}`} className="product-card" style={{ textDecoration: 'none' }}>
      <img
        src={product.imageUrl || `https://picsum.photos/seed/${product.id}/400/300`}
        alt={product.name}
        className="product-image"
        onError={e => { e.target.src = `https://picsum.photos/seed/${Math.random()}/400/300`; }}
      />
      <div className="product-body">
        <span className={`product-type-badge ${TYPE_BADGE_CLASS[product.type] || 'badge-electronics'}`}>
          {TYPE_LABELS[product.type] || product.type}
        </span>
        <div className="product-name">{product.name}</div>
        <div className="product-price-row">
          <span className="product-final-price">
            ₹{product.finalPrice?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
          {product.discountAmount > 0 && (
            <>
              <span className="product-original-price">
                ₹{product.price?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
              <span className="product-discount-badge">{discountPct}% OFF</span>
            </>
          )}
        </div>
        <button className="btn btn-primary w-full" onClick={handleAddToCart} style={{ justifyContent: 'center' }}>
          <ShoppingCart size={15} /> Add to Cart
        </button>
      </div>
    </Link>
  );
}
