import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

const FILTERS = [
  { key: 'ALL', label: 'All Products' },
  { key: 'ELECTRONICS', label: 'Electronics' },
  { key: 'CLOTHING', label: 'Clothing' },
  { key: 'FOOD', label: 'Food & Organic' },
];

export default function Products() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialType = params.get('type') || 'ALL';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(initialType);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setActiveFilter(p.get('type') || 'ALL');
  }, [location.search]);

  useEffect(() => { loadProducts(); }, [activeFilter, search]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const queryParams = {};
      if (activeFilter !== 'ALL') queryParams.type = activeFilter;
      if (search) queryParams.search = search;
      const res = await getProducts(queryParams);
      setProducts(res.data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {/* Page header */}
      <div style={{ background: 'var(--charcoal)', paddingTop: 60, paddingBottom: 48 }}>
        <div className="container">
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
            Browse Our Range
          </p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, textTransform: 'uppercase', color: 'white', lineHeight: 1, letterSpacing: '-0.01em' }}>
            All Products
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 12, fontSize: '0.9rem' }}>
            Products created via the <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Factory Pattern</strong> — discount computed <strong style={{ color: 'rgba(255,255,255,0.8)' }}>polymorphically</strong> per type
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        {/* Filter bar */}
        <div className="filter-bar">
          <span className="filter-label">Category:</span>
          {FILTERS.map(f => (
            <button key={f.key} className={`filter-chip ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}>
              {f.label}
            </button>
          ))}
          <div className="search-input-wrap">
            <Search size={14} className="search-icon" />
            <input className="search-input" placeholder="Search products..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : products.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <div className="empty-title">No Products Found</div>
            <p className="empty-sub">Try a different filter or search term</p>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 20, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {products.length} Product{products.length !== 1 ? 's' : ''}
            </p>
            <div className="products-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
