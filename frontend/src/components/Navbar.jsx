import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, LogOut, User, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">⚡ OOP Shop</Link>

        <ul className="navbar-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/products">Products</NavLink></li>
          {user?.role === 'ADMIN' && <li><NavLink to="/admin">Admin</NavLink></li>}
          {user && <li><NavLink to="/orders">My Orders</NavLink></li>}
        </ul>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/cart" className="cart-btn">
                <ShoppingCart size={16} />
                Cart
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <User size={14} style={{ display: 'inline', marginRight: 4 }} />
                {user.name}
              </span>
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
