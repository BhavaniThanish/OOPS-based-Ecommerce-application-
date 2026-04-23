import { useState, useEffect } from 'react';
import { getMyOrders } from '../api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const STATUS_COLORS = {
  PENDING: 'var(--yellow)', CONFIRMED: 'var(--blue)',
  SHIPPED: 'var(--accent)', DELIVERED: 'var(--green)', CANCELLED: 'var(--red)'
};

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getMyOrders().then(r => setOrders(r.data)).finally(() => setLoading(false));
    } else setLoading(false);
  }, [user]);

  if (!user) return (
    <div className="page"><div className="container" style={{ paddingTop: 60 }}>
      <div className="empty-state">
        <div className="empty-icon">🔒</div>
        <div className="empty-title">Login Required</div>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    </div></div>
  );

  if (loading) return <div className="page"><div className="spinner" /></div>;

  return (
    <div className="page">
      <div className="container" style={{ paddingTop: 40 }}>
        <div className="section-header">
          <div className="section-label">My Account</div>
          <h1 className="section-title">My Orders</h1>
        </div>
        {orders.length === 0 ? (
          <div className="empty-state">
            <Package size={64} style={{ opacity: 0.3, margin: '0 auto 20px', display: 'block' }} />
            <div className="empty-title">No orders yet</div>
            <div className="empty-subtitle">Start shopping to see your orders here</div>
            <Link to="/products" className="btn btn-primary">Shop Now</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {orders.map(order => (
              <div key={order.id} className="card" style={{ padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>Order #{order.id?.slice(-8).toUpperCase()}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <span style={{ color: STATUS_COLORS[order.status] || 'var(--text-muted)', fontWeight: 700, fontSize: '0.85rem', background: `${STATUS_COLORS[order.status]}22`, padding: '5px 12px', borderRadius: 20, border: `1px solid ${STATUS_COLORS[order.status]}44` }}>
                      {order.status}
                    </span>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>
                      ₹{order.totalAmount?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {order.items?.map((item, i) => (
                    <div key={i} style={{ background: 'var(--bg-secondary)', padding: '8px 14px', borderRadius: 8, fontSize: '0.85rem' }}>
                      {item.productName} × {item.quantity}
                    </div>
                  ))}
                </div>
                {order.totalSavings > 0 && (
                  <div style={{ marginTop: 12, color: 'var(--green)', fontSize: '0.85rem', fontWeight: 600 }}>
                    💰 You saved ₹{order.totalSavings?.toLocaleString('en-IN', { maximumFractionDigits: 0 })} with OOP discounts!
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
