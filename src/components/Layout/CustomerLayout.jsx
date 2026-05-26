import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Home, ClipboardList, ShoppingCart, User, LogOut, HelpCircle } from 'lucide-react';


export default function CustomerLayout() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="customer-layout">
      <nav className="top-nav">
        <Link to="/" className="top-nav-brand"><ShoppingBag size={24} style={{ verticalAlign:'middle', marginRight:6, color:'var(--accent)' }}/> Đồ án 103</Link>
        <div className="top-nav-links">
          <Link to="/"><Home size={18} style={{ verticalAlign:'middle', marginRight:4 }}/> <span>Trang chủ</span></Link>
          <Link to="/orders"><ClipboardList size={18} style={{ verticalAlign:'middle', marginRight:4 }}/> <span>Đơn hàng</span></Link>
          <Link to="/cart" className="cart-badge">
            <ShoppingCart size={18} style={{ verticalAlign:'middle', marginRight:4 }}/> <span>Giỏ hàng</span>
            {itemCount > 0 && <span className="count">{itemCount}</span>}
          </Link>
          <Link to="/help"><HelpCircle size={18} style={{ verticalAlign:'middle', marginRight:4 }}/> <span>Trợ giúp</span></Link>
          <Link to="/profile"><User size={18} style={{ verticalAlign:'middle', marginRight:4 }}/> <span>{user?.profile?.TenKH}</span></Link>
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}><LogOut size={16} style={{ verticalAlign:'middle', marginRight:4 }}/> Đăng xuất</button>
        </div>
      </nav>
      <main className="customer-content fade-in"><Outlet /></main>
      <footer style={{ textAlign:'center', padding:'24px', color:'var(--text-muted)', fontSize:13, borderTop:'1px solid var(--border)' }}>
        TS. Nguyễn Gia Tuấn Anh - Quản lý thông tin bán hàng online
      </footer>
    </div>
  );
}
