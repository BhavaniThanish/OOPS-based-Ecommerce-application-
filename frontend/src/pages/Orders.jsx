import { useState, useEffect } from 'react';
import { getMyOrders } from '../api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const STATUS_STYLES = {
  PENDING:   { bg: '#fef3c7', color: '#92400e' },
  CONFIRMED: { bg: '#dbeafe', color: '#1e40af' },
  SHIPPED:   { bg: '#ede9fe', color: '#5b21b6' },
  DELIVERED: { bg: '#d1fae5', color: '#065f46' },
  CANCELLED: { bg: '#fee2e2', color: '#991b1b' },
};

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) getMyOrders().then(r => setOrders(r.data)).finally(() => setLoading(false));
    else setLoading(false);
  }, [user]);

  if (!user) return (
    <div className="page"><div className="container" style={{ paddingTop: 60 }}>
      <div className="empty-state">
        <span className="empty-icon">🔒</span>
        <div className="empty-title">Login Required</div>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    </div></div>
  );

  if (loading) return <div className="page"><div className="spinner" /></div>;

  return (
    <div className="page">
      {/* Header */}
      <div style={{ background: 'var(--charcoal)', paddingTop: 64, paddingBottom: 40 }}>
        <div className="container">
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>My Account</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', color: 'white', lineHeight: 1 }}>
            Order History
          </h1>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        {orders.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📦</span>
            <div className="empty-title">No Orders Yet</div>
            <p className="empty-sub">Start shopping to see your orders here</p>
            <Link to="/products" className="btn btn-primary">Shop Now</Link>
          </div>
        ) : (
          <div>
            {orders.map(order => {
              const ss = STATUS_STYLES[order.status] || { bg: '#f3f4f6', color: '#374151' };
              return (
                <div key={order.id} className="order-card">
                  <div className="order-card-head">
                    <div>
                      <div className="order-id">Order #{order.id?.slice(-8).toUpperCase()}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 3 }}>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                      <span className="status-chip" style={{ background: ss.bg, color: ss.color }}>{order.status}</span>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.8rem', fontWeight: 900, color: 'var(--charcoal)' }}>
                        ₹{order.totalAmount?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: order.totalSavings > 0 ? 12 : 0 }}>
                      {order.items?.map((item, i) => (
                        <span key={i} style={{ background: 'var(--cream)', border: '1px solid var(--border)', padding: '6px 14px', fontSize: '0.82rem', fontWeight: 600, borderRadius: '2px' }}>
                          {item.productName} × {item.quantity}
                        </span>
                      ))}
                    </div>
                    {order.totalSavings > 0 && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#d1fae5', color: '#065f46', padding: '6px 14px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        💰 OOP Discounts saved you ₹{order.totalSavings?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
