import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { LayoutDashboard, Package, Users, ClipboardList, Ticket, LineChart, LogOut, ShoppingBag, User, HelpCircle } from 'lucide-react';


export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  const menuGroups = [
    {
      title: 'Hệ thống',
      items: [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard', end: true }
      ]
    },
    {
      title: 'Danh mục & Nghiệp vụ',
      items: [
        { path: '/admin/products', icon: <Package size={20} />, label: 'Sản phẩm' },
        { path: '/admin/customers', icon: <Users size={20} />, label: 'Khách hàng' },
        { path: '/admin/orders', icon: <ClipboardList size={20} />, label: 'Đơn hàng' },
        { path: '/admin/vouchers', icon: <Ticket size={20} />, label: 'Voucher' }
      ]
    },
    {
      title: 'Báo cáo',
      items: [
        { path: '/admin/reports', icon: <LineChart size={20} />, label: 'Báo cáo' }
      ]
    },
    {
      title: 'Trợ giúp',
      items: [
        { path: '/admin/help', icon: <HelpCircle size={20} />, label: 'Trợ giúp & Giới thiệu' }
      ]
    }
  ];

  return (
    <div className="admin-layout">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo"><ShoppingBag size={24} style={{ verticalAlign:'middle', marginRight:6, color:'var(--accent)' }}/> Đồ án 103</div>
          <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:4 }}>Admin Panel</div>
        </div>
        <nav className="sidebar-nav">
          {menuGroups.map(group => (
            <div key={group.title} className="sidebar-group">
              <div className="sidebar-group-title">{group.title}</div>
              {group.items.map(item => (
                <NavLink key={item.path} to={item.path} end={item.end} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div style={{ fontSize:13, color:'var(--text-secondary)', marginBottom:8 }}><User size={16} style={{ verticalAlign:'middle', marginRight:4 }}/> {user?.profile?.TenNV || 'Admin'}</div>
          <button className="btn btn-secondary btn-sm" style={{ width:'100%' }} onClick={handleLogout}><LogOut size={16} style={{ verticalAlign:'middle', marginRight:4 }}/> Đăng xuất</button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <button className="btn btn-icon btn-secondary" style={{ display:'none' }} onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <div style={{ fontSize:14, color:'var(--text-secondary)' }}>Chào mừng, <strong style={{ color:'var(--text-primary)' }}>{user?.profile?.TenNV}</strong></div>
          <div style={{ display:'flex', gap:12, alignItems:'center' }}>
            <span style={{ fontSize:13, color:'var(--text-muted)' }}>{new Date().toLocaleDateString('vi-VN')}</span>
          </div>
        </header>
        <main className="admin-content fade-in"><Outlet /></main>
      </div>
    </div>
  );
}
