import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts, seedProducts } from '../api';
import toast from 'react-hot-toast';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadFeatured(); }, []);

  const loadFeatured = async () => {
    try {
      const res = await getProducts();
      setFeatured(res.data.slice(0, 6));
    } catch {
      setFeatured([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    try {
      await seedProducts();
      toast.success('Sample products loaded!');
      loadFeatured();
    } catch {
      toast.error('Failed to seed products');
    }
  };

  return (
    <div style={{ paddingTop: 64 }}>

      {/* =================== HERO =================== */}
      <section className="hero">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80"
          alt="hero"
          className="hero-bg"
        />
        <div className="hero-gradient-overlay" />
        <div className="hero-content container">
          <div className="hero-eyebrow">New Arrivals — Spring 2026</div>
          <h1 className="hero-title">
            Shop with<br />
            <span className="hero-title-gold">Purpose</span>
          </h1>
          <p className="hero-subtitle">
            An ecommerce platform built on Object-Oriented Programming principles —
            every product type calculates discounts its own way.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-gold btn-lg">Shop All Products</Link>
            <button className="btn btn-outline-white btn-lg" onClick={handleSeed}>Load Demo Products</button>
          </div>
        </div>
      </section>

      {/* =================== CATEGORY STRIP =================== */}
      <div className="cat-strip">
        <div className="cat-strip-inner">
          {[
            { label: 'All Products', icon: '🛍️', href: '/products', count: 'Browse everything' },
            { label: 'Electronics', icon: '💻', href: '/products?type=ELECTRONICS', count: '10% Discount' },
            { label: 'Clothing', icon: '👗', href: '/products?type=CLOTHING', count: '20% Discount' },
            { label: 'Food & Organic', icon: '🌿', href: '/products?type=FOOD', count: '5–7% Discount' },
          ].map((cat) => (
            <Link key={cat.label} to={cat.href} className="cat-item" style={{ textDecoration: 'none' }}>
              <div className="cat-icon">{cat.icon}</div>
              <span className="cat-name">{cat.label}</span>
              <span className="cat-count">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* =================== HOW POLYMORPHISM WORKS =================== */}
      <section className="section section-cream">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="section-eyebrow">OOP Concepts in Action</div>
            <h2 className="section-title" style={{ justifyContent: 'center', display: 'block' }}>
              Polymorphic Discounts
            </h2>
            <p className="section-subtitle" style={{ margin: '12px auto 0', textAlign: 'center' }}>
              Same <code style={{ fontFamily: 'monospace', background: 'rgba(0,0,0,0.07)', padding: '2px 6px' }}>calculateDiscount()</code> call — completely different results based on product type
            </p>
          </div>

          <div className="oop-row">
            {[
              { type: 'ELECTRONICS', discount: '10%', label: 'Electronics', sub: 'Electronics class extends BaseProduct and overrides calculateDiscount() to return 10% of the price.', cls: 'electronics', code: 'new Electronics().calculateDiscount()' },
              { type: 'CLOTHING', discount: '20%', label: 'Clothing', sub: 'Clothing class extends BaseProduct and overrides calculateDiscount() to return 20% of the price.', cls: 'clothing', code: 'new Clothing().calculateDiscount()' },
              { type: 'FOOD', discount: '5–7%', label: 'Food & Organic', sub: 'FoodProduct overrides calculateDiscount() to return 5% base + 2% bonus for organic products.', cls: 'food', code: 'new FoodProduct().calculateDiscount()' },
            ].map(item => (
              <div key={item.type} className={`oop-card oop-card-${item.cls}`}>
                <div className={`oop-card-discount oop-card-discount-${item.cls}`}>{item.discount}</div>
                <div className="oop-card-label">{item.label}</div>
                <p className="oop-card-sub">{item.sub}</p>
                <div className="oop-card-code">{item.code}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FEATURED PRODUCTS =================== */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="section-eyebrow">Featured</div>
              <h2 className="section-title">Select Products</h2>
            </div>
            <Link to="/products" className="btn btn-outline">View All Products</Link>
          </div>
          {loading ? (
            <div className="spinner" />
          ) : featured.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📦</span>
              <div className="empty-title">No Products Yet</div>
              <p className="empty-sub">Click below to load sample products and see the store in action</p>
              <button className="btn btn-primary" onClick={handleSeed}>Load Sample Data</button>
            </div>
          ) : (
            <div className="products-grid">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* =================== PROMO BANNER =================== */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-title">Free Shipping on Electronics Over ₹10,000</div>
          <p className="promo-sub">Premium electronics from top brands — quality guaranteed</p>
          <Link to="/products?type=ELECTRONICS" className="btn btn-gold btn-lg">Shop Electronics</Link>
        </div>
      </section>

      {/* =================== FOOTER =================== */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-brand-title">OOP<span>Shop</span></div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
              A full-stack ecommerce application built to demonstrate OOP concepts — Abstraction, Inheritance, Polymorphism, Encapsulation &amp; Factory Pattern.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Shop</div>
            <Link to="/products">All Products</Link>
            <Link to="/products?type=ELECTRONICS">Electronics</Link>
            <Link to="/products?type=CLOTHING">Clothing</Link>
            <Link to="/products?type=FOOD">Food & Organic</Link>
          </div>
          <div>
            <div className="footer-col-title">Account</div>
            <Link to="/login">Login</Link>
            <Link to="/register">Create Account</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">My Orders</Link>
          </div>
          <div>
            <div className="footer-col-title">OOP Concepts</div>
            <a href="#">Abstraction</a>
            <a href="#">Inheritance</a>
            <a href="#">Polymorphism</a>
            <a href="#">Factory Pattern</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 OOP Shop — Built with Spring Boot + React</span>
          <span>Java 21 · MongoDB · JWT Auth</span>
        </div>
      </footer>
    </div>
  );
}
