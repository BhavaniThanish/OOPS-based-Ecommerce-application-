import { useState } from 'react';
import { createProduct } from '../api';
import toast from 'react-hot-toast';

const PRODUCT_TYPES = ['ELECTRONICS', 'CLOTHING', 'FOOD'];

export default function Admin() {
  const [form, setForm] = useState({
    type: 'ELECTRONICS', name: '', price: '', stock: '',
    description: '', imageUrl: '',
    brand: '', warrantyMonths: '',
    size: '', color: '', material: '',
    weightKg: '', isOrganic: false,
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const update = (k, v) => {
    const next = { ...form, [k]: v };
    setForm(next);
    if (next.price) {
      const price = parseFloat(next.price);
      const rates = { ELECTRONICS: 0.10, CLOTHING: 0.20, FOOD: next.isOrganic ? 0.07 : 0.05 };
      const pct = rates[next.type] || 0.10;
      setPreview({ pct: pct * 100, discount: price * pct, final: price - price * pct });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProduct({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        warrantyMonths: form.warrantyMonths ? parseInt(form.warrantyMonths) : null,
        weightKg: form.weightKg ? parseFloat(form.weightKg) : null,
        isOrganic: form.isOrganic,
      });
      toast.success(`${form.type} product created via Factory Pattern! ✅`);
      setForm({ type: 'ELECTRONICS', name: '', price: '', stock: '', description: '', imageUrl: '', brand: '', warrantyMonths: '', size: '', color: '', material: '', weightKg: '', isOrganic: false });
      setPreview(null);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to create product');
    } finally { setLoading(false); }
  };

  const typeColors = { ELECTRONICS: 'var(--electronics-color)', CLOTHING: 'var(--clothing-color)', FOOD: 'var(--food-color)' };

  return (
    <div className="page">
      {/* Header */}
      <div style={{ background: 'var(--charcoal)', paddingTop: 64, paddingBottom: 40 }}>
        <div className="container">
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Admin Panel</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', color: 'white', lineHeight: 1 }}>
            Add New Product
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 10, fontSize: '0.88rem' }}>
            Products are created using the <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Factory Pattern</strong> — select a type to invoke the right subclass.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div className="admin-layout">
          <form onSubmit={handleSubmit}>
            {/* Type selector */}
            <div style={{ marginBottom: 28 }}>
              <div className="form-label">Product Type (Factory Pattern)</div>
              <div style={{ display: 'flex', gap: 0, borderLeft: '2px solid var(--border)' }}>
                {PRODUCT_TYPES.map(t => (
                  <button type="button" key={t}
                    onClick={() => update('type', t)}
                    style={{
                      flex: 1, padding: '14px 8px', borderRight: '2px solid var(--border)',
                      borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)',
                      background: form.type === t ? typeColors[t] : 'white',
                      color: form.type === t ? 'white' : 'var(--text-muted)',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: '1rem', fontWeight: 800, letterSpacing: '0.05em',
                      textTransform: 'uppercase', cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}>
                    {t}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>
                💡 <code style={{ fontFamily: 'monospace' }}>ProductFactory.createProduct("{form.type}")</code> will be called
              </p>
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
              <textarea className="form-input" rows={3} placeholder="Write a short product description..." value={form.description} onChange={e => update('description', e.target.value)} style={{ resize: 'vertical' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Image URL (optional)</label>
              <input className="form-input" placeholder="https://..." value={form.imageUrl} onChange={e => update('imageUrl', e.target.value)} />
            </div>

            {form.type === 'ELECTRONICS' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group"><label className="form-label">Brand</label><input className="form-input" placeholder="Samsung" value={form.brand} onChange={e => update('brand', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Warranty (months)</label><input className="form-input" type="number" placeholder="12" value={form.warrantyMonths} onChange={e => update('warrantyMonths', e.target.value)} /></div>
              </div>
            )}
            {form.type === 'CLOTHING' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div className="form-group"><label className="form-label">Size</label><input className="form-input" placeholder="M" value={form.size} onChange={e => update('size', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Color</label><input className="form-input" placeholder="Blue" value={form.color} onChange={e => update('color', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Material</label><input className="form-input" placeholder="Cotton" value={form.material} onChange={e => update('material', e.target.value)} /></div>
              </div>
            )}
            {form.type === 'FOOD' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group"><label className="form-label">Weight (kg)</label><input className="form-input" type="number" step="0.1" placeholder="0.5" value={form.weightKg} onChange={e => update('weightKg', e.target.value)} /></div>
                <div className="form-group">
                  <label className="form-label">Organic</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 8 }}>
                    <input type="checkbox" checked={form.isOrganic} onChange={e => update('isOrganic', e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer', accentColor: 'var(--forest)' }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Organic product (+2% discount)</span>
                  </div>
                </div>
              </div>
            )}

            <button className="btn btn-primary w-full btn-lg" type="submit" disabled={loading}>
              {loading ? 'Creating Product...' : `+ Create ${form.type} Product`}
            </button>
          </form>

          {/* Live Preview */}
          <div>
            <div style={{ background: 'var(--charcoal)', padding: 32 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.4rem', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20 }}>
                Factory Pattern Preview
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', padding: 20, fontFamily: 'monospace', fontSize: '0.83rem', lineHeight: 2, borderLeft: '3px solid var(--gold)' }}>
                <div style={{ color: 'rgba(255,255,255,0.4)' }}>// Factory creates the right subclass</div>
                <div><span style={{ color: '#f59e0b' }}>BaseProduct</span> <span style={{ color: 'white' }}>product</span> =</div>
                <div style={{ paddingLeft: 20 }}><span style={{ color: '#60a5fa' }}>ProductFactory</span><span style={{ color: 'rgba(255,255,255,0.7)' }}>.createProduct(</span></div>
                <div style={{ paddingLeft: 40, color: '#34d399' }}>"{form.type}"</div>
                <div style={{ paddingLeft: 20, color: 'rgba(255,255,255,0.7)' }}>);</div>
                <br />
                <div style={{ color: 'rgba(255,255,255,0.35)' }}>// Returns new {form.type === 'ELECTRONICS' ? 'Electronics' : form.type === 'CLOTHING' ? 'Clothing' : 'FoodProduct'}()</div>
              </div>

              {preview && (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1rem', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                    Polymorphic Discount
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Original Price</span>
                    <span style={{ color: 'white', fontWeight: 700 }}>₹{parseFloat(form.price).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Discount ({preview.pct}%)</span>
                    <span style={{ color: 'var(--gold)', fontWeight: 700 }}>−₹{preview.discount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'white', fontWeight: 700 }}>Final Price</span>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>₹{preview.final.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
