import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, LogOut, User } from 'lucide-react';

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
        <Link to="/" className="navbar-logo">OOP<span>Shop</span></Link>

        <ul className="navbar-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/products">Products</NavLink></li>
          <li><NavLink to="/products?type=ELECTRONICS">Electronics</NavLink></li>
          <li><NavLink to="/products?type=CLOTHING">Clothing</NavLink></li>
          <li><NavLink to="/products?type=FOOD">Food</NavLink></li>
          {user && <li><NavLink to="/orders">My Orders</NavLink></li>}
          {user?.role === 'ADMIN' && <li><NavLink to="/admin">Admin</NavLink></li>}
        </ul>

        <div className="navbar-actions">
          {user ? (
            <>
              <span className="nav-user-name">{user.name}</span>
              <Link to="/cart" className="cart-btn">
                <ShoppingCart size={14} />
                Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <button
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '4px' }}
                onClick={handleLogout} title="Logout"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/register" className="cart-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
