import { useState } from 'react';
import { createProduct } from '../api';
import toast from 'react-hot-toast';
import { PlusCircle, Factory } from 'lucide-react';

const PRODUCT_TYPES = ['ELECTRONICS', 'CLOTHING', 'FOOD'];

export default function Admin() {
  const [form, setForm] = useState({
    type: 'ELECTRONICS', name: '', price: '', stock: '',
    description: '', imageUrl: '',
    // Electronics
    brand: '', warrantyMonths: '',
    // Clothing
    size: '', color: '', material: '',
    // Food
    weightKg: '', isOrganic: false,
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const update = (k, v) => {
    const next = { ...form, [k]: v };
    setForm(next);
    // Live discount preview (Factory Pattern simulation)
    if (next.price) {
      const price = parseFloat(next.price);
      const discounts = { ELECTRONICS: 0.10, CLOTHING: 0.20, FOOD: 0.05 };
      const pct = discounts[next.type] || 0.05;
      setPreview({ discount: price * pct, final: price - price * pct, pct: pct * 100 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        warrantyMonths: form.warrantyMonths ? parseInt(form.warrantyMonths) : null,
        weightKg: form.weightKg ? parseFloat(form.weightKg) : null,
        isOrganic: form.isOrganic,
      };
      await createProduct(payload);
      toast.success(`${form.type} product created! Factory Pattern in action! ✅`);
      setForm({ type: 'ELECTRONICS', name: '', price: '', stock: '', description: '', imageUrl: '', brand: '', warrantyMonths: '', size: '', color: '', material: '', weightKg: '', isOrganic: false });
      setPreview(null);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container" style={{ paddingTop: 40 }}>
        <div className="section-header">
          <div className="section-label">Admin Panel</div>
          <h1 className="section-title">Add New Product</h1>
          <p className="section-subtitle">
            The <strong>Factory Pattern</strong> creates the right OOP subclass based on the type you select below.
          </p>
        </div>

        <div className="admin-grid">
          <form onSubmit={handleSubmit}>
            {/* Product Type — THIS is the Factory Pattern trigger */}
            <div className="form-group">
              <label className="form-label">Product Type (Factory Pattern)</label>
              <select className="form-select" value={form.type} onChange={e => update('type', e.target.value)}>
                {PRODUCT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 6 }}>
                💡 ProductFactory.createProduct("{form.type}") will be called on submit
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input className="form-input" placeholder="Product name" required value={form.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input className="form-input" type="number" placeholder="1299" required min={1} value={form.price} onChange={e => update('price', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Stock</label>
                <input className="form-input" type="number" placeholder="50" required min={0} value={form.stock} onChange={e => update('stock', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" rows={3} placeholder="Product description..." value={form.description} onChange={e => update('description', e.target.value)} style={{ resize: 'vertical' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Image URL (optional)</label>
              <input className="form-input" placeholder="https://..." value={form.imageUrl} onChange={e => update('imageUrl', e.target.value)} />
            </div>

            {/* Electronics fields */}
            {form.type === 'ELECTRONICS' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group"><label className="form-label">Brand</label><input className="form-input" placeholder="Samsung" value={form.brand} onChange={e => update('brand', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Warranty (months)</label><input className="form-input" type="number" placeholder="12" value={form.warrantyMonths} onChange={e => update('warrantyMonths', e.target.value)} /></div>
              </div>
            )}

            {/* Clothing fields */}
            {form.type === 'CLOTHING' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div className="form-group"><label className="form-label">Size</label><input className="form-input" placeholder="M" value={form.size} onChange={e => update('size', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Color</label><input className="form-input" placeholder="Blue" value={form.color} onChange={e => update('color', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Material</label><input className="form-input" placeholder="Cotton" value={form.material} onChange={e => update('material', e.target.value)} /></div>
              </div>
            )}

            {/* Food fields */}
            {form.type === 'FOOD' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group"><label className="form-label">Weight (kg)</label><input className="form-input" type="number" step="0.1" placeholder="0.5" value={form.weightKg} onChange={e => update('weightKg', e.target.value)} /></div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>Organic?</label>
                  <input type="checkbox" checked={form.isOrganic} onChange={e => update('isOrganic', e.target.checked)} style={{ width: 18, height: 18, cursor: 'pointer' }} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>+2% extra discount</span>
                </div>
              </div>
            )}

            <button className="btn btn-primary w-full" type="submit" disabled={loading} style={{ justifyContent: 'center', padding: 14, marginTop: 8 }}>
              <PlusCircle size={17} /> {loading ? 'Creating...' : 'Create Product'}
            </button>
          </form>

          {/* Live Preview Panel */}
          <div>
            <div className="card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
                <Factory size={20} style={{ color: 'var(--accent)' }} />
                <h3 style={{ fontWeight: 700 }}>Factory Pattern Preview</h3>
              </div>

              <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 20, fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 2 }}>
                <div><span style={{ color: '#ec4899' }}>BaseProduct</span> product =</div>
                <div style={{ paddingLeft: 16 }}><span style={{ color: '#8b5cf6' }}>ProductFactory</span>.createProduct(</div>
                <div style={{ paddingLeft: 32 }}><span style={{ color: '#f59e0b' }}>"{form.type}"</span></div>
                <div style={{ paddingLeft: 16 }}>);</div>
                <br />
                <div><span style={{ color: '#10b981' }}>// Returns: </span>
                  <span style={{ color: '#3b82f6' }}>new {form.type === 'ELECTRONICS' ? 'Electronics' : form.type === 'CLOTHING' ? 'Clothing' : 'FoodProduct'}()</span>
                </div>
              </div>

              {preview && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontWeight: 700, marginBottom: 14, color: 'var(--text-primary)' }}>Discount Calculation (Polymorphism)</div>
                  <div className="summary-row"><span className="summary-label">Original Price</span><span className="summary-value">₹{parseFloat(form.price).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
                  <div className="summary-row"><span className="summary-label">Discount ({preview.pct}%)</span><span style={{ color: 'var(--green)', fontWeight: 700 }}>−₹{preview.discount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
                  <hr className="divider" />
                  <div className="summary-row"><span className="summary-label summary-total">Final Price</span><span className="summary-value summary-total">₹{preview.final.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
