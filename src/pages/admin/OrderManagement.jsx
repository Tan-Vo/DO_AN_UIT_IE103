import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useNotification } from '../../context/NotificationContext';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/helpers';
import { ClipboardList, Search, Eye, ArrowRight, X, Package, Check } from 'lucide-react';


const STATUS_FLOW = ['Chờ xác nhận', 'Đang xử lý', 'Đang giao', 'Hoàn thành'];

export default function OrderManagement() {
  const { orders, orderDetails, products, customers, shippingProviders, paymentMethods, vouchers, updateOrderStatus } = useData();
  const { showToast } = useNotification();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [detail, setDetail] = useState(null);

  const filtered = orders.filter(o => {
    if (search && !o.MaDH.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && o.TrangThai !== statusFilter) return false;
    return true;
  }).sort((a, b) => new Date(b.NgayDat) - new Date(a.NgayDat));

  const handleStatusUpdate = (id, newStatus) => {
    updateOrderStatus(id, newStatus);
    showToast(`Đơn ${id} → ${newStatus}`, 'success');
    if (detail) setDetail({ ...detail, TrangThai: newStatus });
  };

  const getNextStatus = (current) => {
    const idx = STATUS_FLOW.indexOf(current);
    return idx >= 0 && idx < STATUS_FLOW.length - 1 ? STATUS_FLOW[idx + 1] : null;
  };

  return (
    <div className="slide-up">
      <div className="page-header">
        <div><h1 className="page-title" style={{ display:'flex', alignItems:'center', gap:12 }}><ClipboardList size={28} color="var(--accent)" /> Quản lý đơn hàng</h1><p className="page-subtitle">{orders.length} đơn hàng</p></div>
      </div>

      <div className="filter-bar">
        <div className="search-input"><span className="search-icon"><Search size={18} /></span><input className="input" placeholder="Tìm mã đơn hàng..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft:36 }} /></div>
        <select className="select" style={{ width:180 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          {[...STATUS_FLOW, 'Đã hủy'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="card" style={{ padding:0 }}>
        <div className="table-container">
          <table className="table">
            <thead><tr><th>Mã ĐH</th><th>Khách hàng</th><th>Ngày đặt</th><th>Tổng tiền</th><th>Vận chuyển</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              {filtered.map(o => {
                const next = getNextStatus(o.TrangThai);
                return (
                  <tr key={o.MaDH}>
                    <td style={{ fontWeight:600 }}>{o.MaDH}</td>
                    <td>{customers.find(c => c.MaKH === o.MaKH)?.TenKH}</td>
                    <td>{formatDate(o.NgayDat)}</td>
                    <td style={{ fontWeight:600, color:'var(--accent-light)' }}>{formatCurrency(o.TongTien)}</td>
                    <td style={{ fontSize:13 }}>{shippingProviders.find(s => s.MaDVVC === o.MaDVVC)?.TenDVVC}</td>
                    <td><span className="badge" style={{ background:`${getStatusColor(o.TrangThai)}20`, color:getStatusColor(o.TrangThai) }}>{o.TrangThai}</span></td>
                    <td><div style={{ display:'flex', gap:6 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => setDetail(o)}><Eye size={16} /></button>
                      {next && <button className="btn btn-primary btn-sm" onClick={() => handleStatusUpdate(o.MaDH, next)} style={{ display:'flex', alignItems:'center', gap:4 }}><ArrowRight size={14} /> {next}</button>}
                      {o.TrangThai === 'Chờ xác nhận' && <button className="btn btn-danger btn-sm" onClick={() => handleStatusUpdate(o.MaDH, 'Đã hủy')}><X size={16} /></button>}
                    </div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (
        <div className="modal-overlay" onClick={() => setDetail(null)}>
          <div className="modal" style={{ maxWidth:700 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3 style={{ display:'flex', alignItems:'center', gap:8 }}><ClipboardList size={20} /> Chi tiết đơn hàng {detail.MaDH}</h3><button className="btn btn-icon btn-secondary" onClick={() => setDetail(null)}>✕</button></div>
            <div className="modal-body">
              <div style={{ display:'flex', justifyContent:'center', gap:0, marginBottom:24 }}>
                {STATUS_FLOW.map((s, i) => {
                  const currentIdx = STATUS_FLOW.indexOf(orders.find(o=>o.MaDH===detail.MaDH)?.TrangThai);
                  const done = i < currentIdx; const active = i === currentIdx;
                  return (
                    <div key={s} style={{ display:'flex', alignItems:'center' }}>
                      <div style={{ textAlign:'center' }}>
                        <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, background: done ? 'var(--success)' : active ? 'var(--accent)' : 'var(--bg-glass)', color: done || active ? '#fff' : 'var(--text-muted)', border:`2px solid ${done ? 'var(--success)' : active ? 'var(--accent)' : 'var(--border)'}` }}>{done ? <Check size={16} /> : i+1}</div>
                        <div style={{ fontSize:11, color: active ? 'var(--accent-light)' : 'var(--text-muted)', marginTop:4, maxWidth:70 }}>{s}</div>
                      </div>
                      {i < STATUS_FLOW.length-1 && <div style={{ width:40, height:2, background: done ? 'var(--success)' : 'var(--border)', margin:'0 4px' }} />}
                    </div>
                  );
                })}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
                {[['Khách hàng', customers.find(c=>c.MaKH===detail.MaKH)?.TenKH], ['Địa chỉ', detail.DiaChiGiao], ['Thanh toán', paymentMethods.find(p=>p.MaPTTT===detail.MaPTTT)?.TenPTTT], ['Vận chuyển', shippingProviders.find(s=>s.MaDVVC===detail.MaDVVC)?.TenDVVC], ['Voucher', detail.MaVoucher || 'Không'], ['Phí VC', formatCurrency(detail.PhiVC)]].map(([l,v]) => (
                  <div key={l}><div style={{ fontSize:12, color:'var(--text-muted)' }}>{l}</div><div style={{ fontWeight:500 }}>{v}</div></div>
                ))}
              </div>
              <h4 style={{ marginBottom:12, display:'flex', alignItems:'center', gap:8 }}><Package size={18} /> Sản phẩm</h4>
              <div className="table-container">
                <table className="table">
                  <thead><tr><th>Sản phẩm</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead>
                  <tbody>
                    {orderDetails.filter(od => od.MaDH === detail.MaDH).map((od, i) => (
                      <tr key={i}><td>{products.find(p=>p.MaSP===od.MaSP)?.TenSP}</td><td>{od.SoLuong}</td><td>{formatCurrency(od.DonGia)}</td><td style={{ fontWeight:600 }}>{formatCurrency(od.DonGia * od.SoLuong)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ textAlign:'right', marginTop:16, fontSize:20, fontWeight:700, color:'var(--accent-light)' }}>Tổng: {formatCurrency(detail.TongTien)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
