import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts, seedProducts } from '../api';
import toast from 'react-hot-toast';
import { Zap, ShoppingBag, Cpu, Shirt, Apple } from 'lucide-react';

const OOP_CONCEPTS = [
  { label: 'Abstraction', dot: 'dot-purple' },
  { label: 'Inheritance', dot: 'dot-pink' },
  { label: 'Polymorphism', dot: 'dot-blue' },
  { label: 'Encapsulation', dot: 'dot-green' },
  { label: 'Interfaces', dot: 'dot-yellow' },
  { label: 'Factory Pattern', dot: 'dot-purple' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeatured();
  }, []);

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
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-tag">
            <Zap size={13} /> OOPS-Based Ecommerce Application
          </div>
          <h1 className="hero-title">
            Shop Smart with<br />
            <span className="hero-gradient">OOP Principles</span>
          </h1>
          <p className="hero-subtitle">
            A full-stack ecommerce platform built to demonstrate Object-Oriented Programming
            concepts — Abstraction, Inheritance, Polymorphism, Encapsulation &amp; Factory Pattern.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary btn-lg">
              <ShoppingBag size={18} /> Shop Now
            </Link>
            <button className="btn btn-secondary btn-lg" onClick={handleSeed}>
              Load Sample Data
            </button>
          </div>

          <div className="oop-concepts" style={{ marginTop: 48 }}>
            {OOP_CONCEPTS.map(c => (
              <div key={c.label} className="oop-badge">
                <div className={`oop-badge-dot ${c.dot}`} />
                {c.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW OOP WORKS HERE */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div className="section-label">OOP Concepts in Action</div>
            <h2 className="section-title">See how Polymorphism works</h2>
            <p className="section-subtitle">Same base class — different discount logic for each product type</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { icon: <Cpu size={28} />, type: 'Electronics', discount: '10%', color: 'var(--electronics)', cls: 'badge-electronics', pattern: 'Electronics → 10% discount' },
              { icon: <Shirt size={28} />, type: 'Clothing', discount: '20%', color: 'var(--clothing)', cls: 'badge-clothing', pattern: 'Clothing → 20% discount' },
              { icon: <Apple size={28} />, type: 'Food', discount: '5–7%', color: 'var(--food)', cls: 'badge-food', pattern: 'Food → 5% (7% if organic)' },
            ].map(item => (
              <div key={item.type} className="card" style={{ padding: 28 }}>
                <div style={{ color: item.color, marginBottom: 16 }}>{item.icon}</div>
                <span className={`product-type-badge ${item.cls}`}>{item.type}</span>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: item.color, margin: '12px 0 6px', letterSpacing: -1 }}>{item.discount}</div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 8 }}>Polymorphic Discount</div>
                <code style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>calculateDiscount()</code>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 8 }}>{item.pattern}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div className="section-label">Featured</div>
              <h2 className="section-title">Products</h2>
            </div>
            <Link to="/products" className="btn btn-secondary">View All</Link>
          </div>
          {loading ? (
            <div className="spinner" />
          ) : featured.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <div className="empty-title">No products yet</div>
              <div className="empty-subtitle">Click "Load Sample Data" to add demo products</div>
              <button className="btn btn-primary" onClick={handleSeed}>Load Sample Data</button>
            </div>
          ) : (
            <div className="products-grid">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
