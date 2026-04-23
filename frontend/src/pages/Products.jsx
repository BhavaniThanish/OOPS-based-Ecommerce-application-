import { useState, useEffect } from 'react';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

const FILTERS = ['ALL', 'ELECTRONICS', 'CLOTHING', 'FOOD'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadProducts();
  }, [activeFilter, search]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (activeFilter !== 'ALL') params.type = activeFilter;
      if (search) params.search = search;
      const res = await getProducts(params);
      setProducts(res.data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container" style={{ paddingTop: 40 }}>
        <div className="section-header">
          <div className="section-label">Browse</div>
          <h1 className="section-title">All Products</h1>
          <p className="section-subtitle">
            Products created using the <strong>Factory Pattern</strong> — each type calculates
            discounts <strong>polymorphically</strong>.
          </p>
        </div>

        <div className="filter-bar">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === 'ALL' ? 'All Products' : f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
          <div className="search-input-wrap" style={{ marginLeft: 'auto' }}>
            <Search size={15} className="search-icon" />
            <input
              className="search-input"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">No products found</div>
            <div className="empty-subtitle">Try a different filter or search term</div>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 24 }}>
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
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
