import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const TYPE_LABELS = { ELECTRONICS: 'Electronics', CLOTHING: 'Clothing', FOOD: 'Food & Organic' };

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { toast.error('Please login to add items to cart'); return; }
    try {
      await addToCart(product.id, 1);
      toast.success(`Added to cart!`);
    } catch {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-card-body">
        <span className="product-type-badge">{TYPE_LABELS[product.type] || product.type}</span>
        <div className="product-name">{product.name}</div>
        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}
        <div className="product-price-row">
          <span className="product-final-price">
            ₹{product.finalPrice?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
          {product.discountAmount > 0 && (
            <>
              <span className="product-original-price">
                ₹{product.price?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
              <span className="product-discount-badge">
                −{product.discountPercentage?.toFixed(0)}%
              </span>
            </>
          )}
        </div>
      </div>
      <div className="product-image-wrap">
        <img
          src={product.imageUrl || `https://picsum.photos/seed/${product.id || product.name}/600/450`}
          alt={product.name}
          className="product-image"
          onError={e => { e.target.src = `https://picsum.photos/seed/${Math.random()}/600/450`; }}
        />
      </div>
      <button className="product-add-btn" onClick={handleAddToCart}>
        + Add to Cart
      </button>
    </Link>
  );
}
