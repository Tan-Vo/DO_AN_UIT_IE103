import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useNotification } from '../../context/NotificationContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { Users, Search, Eye, Lock, Unlock, User, ClipboardList } from 'lucide-react';


export default function CustomerManagement() {
  const { customers, orders, updateCustomerStatus } = useData();
  const { showToast } = useNotification();
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState(null);

  const filtered = customers.filter(c =>
    !search || c.TenKH.toLowerCase().includes(search.toLowerCase()) || c.Email.toLowerCase().includes(search.toLowerCase())
  );

  const getCustomerOrders = (id) => orders.filter(o => o.MaKH === id);
  const getCustomerSpent = (id) => getCustomerOrders(id).filter(o => o.TrangThai === 'Hoàn thành').reduce((s, o) => s + o.TongTien, 0);

  const toggleBan = (id, current) => {
    const newStatus = current === 'Active' ? 'Banned' : 'Active';
    updateCustomerStatus(id, newStatus);
    showToast(newStatus === 'Banned' ? 'Đã khóa tài khoản' : 'Đã mở khóa tài khoản', 'success');
  };

  return (
    <div className="slide-up">
      <div className="page-header">
        <div><h1 className="page-title" style={{ display:'flex', alignItems:'center', gap:12 }}><Users size={28} color="var(--accent)" /> Quản lý khách hàng</h1><p className="page-subtitle">{customers.length} khách hàng</p></div>
      </div>

      <div className="filter-bar">
        <div className="search-input"><span className="search-icon"><Search size={18} /></span><input className="input" placeholder="Tìm theo tên, email..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft:36 }} /></div>
      </div>

      <div className="card" style={{ padding:0 }}>
        <div className="table-container">
          <table className="table">
            <thead><tr><th>Mã KH</th><th>Tên</th><th>Email</th><th>SĐT</th><th>Tổng đơn</th><th>Chi tiêu</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.MaKH}>
                  <td style={{ fontWeight:600 }}>{c.MaKH}</td>
                  <td>{c.TenKH}</td>
                  <td style={{ color:'var(--text-secondary)' }}>{c.Email}</td>
                  <td>{c.SoDT}</td>
                  <td>{getCustomerOrders(c.MaKH).length}</td>
                  <td style={{ fontWeight:600, color:'var(--accent-light)' }}>{formatCurrency(getCustomerSpent(c.MaKH))}</td>
                  <td><span className={`badge badge-${c.TrangThai === 'Active' ? 'success' : 'danger'}`}>{c.TrangThai}</span></td>
                  <td><div style={{ display:'flex', gap:6 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setDetail(c)}><Eye size={16} /></button>
                    <button className={`btn btn-sm ${c.TrangThai === 'Active' ? 'btn-danger' : 'btn-success'}`} onClick={() => toggleBan(c.MaKH, c.TrangThai)}>{c.TrangThai === 'Active' ? <Lock size={16} /> : <Unlock size={16} />}</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (
        <div className="modal-overlay" onClick={() => setDetail(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3 style={{ display:'flex', alignItems:'center', gap:8 }}><User size={20} /> Chi tiết khách hàng</h3><button className="btn btn-icon btn-secondary" onClick={() => setDetail(null)}>✕</button></div>
            <div className="modal-body">
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
                {[['Tên', detail.TenKH], ['Email', detail.Email], ['SĐT', detail.SoDT], ['Địa chỉ', detail.DiaChi], ['Tài khoản', detail.TaiKhoan], ['Ngày ĐK', formatDate(detail.NgayDK)]].map(([l,v]) => (
                  <div key={l}><div style={{ fontSize:12, color:'var(--text-muted)' }}>{l}</div><div style={{ fontWeight:500 }}>{v}</div></div>
                ))}
              </div>
              <h4 style={{ marginBottom:12, display:'flex', alignItems:'center', gap:8 }}><ClipboardList size={18} /> Lịch sử đơn hàng</h4>
              <div className="table-container">
                <table className="table">
                  <thead><tr><th>Mã ĐH</th><th>Ngày</th><th>Tổng</th><th>Trạng thái</th></tr></thead>
                  <tbody>
                    {getCustomerOrders(detail.MaKH).map(o => (
                      <tr key={o.MaDH}><td>{o.MaDH}</td><td>{formatDate(o.NgayDat)}</td><td style={{ fontWeight:600 }}>{formatCurrency(o.TongTien)}</td><td><span className="badge" style={{ background:`${getStatusColor(o.TrangThai)}20`, color:getStatusColor(o.TrangThai) }}>{o.TrangThai}</span></td></tr>
                    ))}
                    {getCustomerOrders(detail.MaKH).length === 0 && <tr><td colSpan={4} style={{ textAlign:'center', color:'var(--text-muted)' }}>Chưa có đơn hàng</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getStatusColor(status) {
  const map = { 'Chờ xác nhận':'#f59e0b', 'Đang xử lý':'#3b82f6', 'Đang giao':'#8b5cf6', 'Hoàn thành':'#10b981', 'Đã hủy':'#ef4444' };
  return map[status] || '#6b7280';
}
