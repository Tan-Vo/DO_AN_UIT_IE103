import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNotification } from '../../context/NotificationContext';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/helpers';
import { ClipboardList, PackageX, X, Check, AlertTriangle } from 'lucide-react';


const STATUS_FLOW = ['Chờ xác nhận', 'Đang xử lý', 'Đang giao', 'Hoàn thành'];

export default function OrderHistory() {
  const { user } = useAuth();
  const { orders, orderDetails, products, shippingProviders, paymentMethods, updateOrderStatus } = useData();
  const { showToast } = useNotification();
  const [statusFilter, setStatusFilter] = useState('');
  const [detail, setDetail] = useState(null);
  const [cancelModal, setCancelModal] = useState(null);

  const myOrders = orders.filter(o => o.MaKH === user.id).sort((a,b) => new Date(b.NgayDat) - new Date(a.NgayDat));
  const filtered = statusFilter ? myOrders.filter(o => o.TrangThai === statusFilter) : myOrders;

  const confirmCancel = () => {
    if (cancelModal) {
      updateOrderStatus(cancelModal, 'Đã hủy');
      showToast('Đã hủy đơn hàng', 'success');
      setCancelModal(null);
      setDetail(null);
    }
  };

  return (
    <div className="slide-up">
      <div className="page-header">
        <h1 className="page-title" style={{ display:'flex', alignItems:'center', gap:12 }}><ClipboardList size={28} color="var(--accent)" /> Đơn hàng của tôi</h1>
      </div>

      <div className="filter-bar">
        {['', ...STATUS_FLOW, 'Đã hủy'].map(s => (
          <button key={s} className={`btn btn-sm ${statusFilter===s?'btn-primary':'btn-secondary'}`} onClick={() => setStatusFilter(s)}>
            {s || 'Tất cả'} {s ? `(${myOrders.filter(o=>o.TrangThai===s).length})` : `(${myOrders.length})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:60, color:'var(--text-muted)' }}>
          <div style={{ marginBottom:16 }}><PackageX size={64} color="var(--text-muted)" /></div>
          <p style={{ marginTop:12 }}>Chưa có đơn hàng nào</p>
        </div>
      ) : (
        filtered.map(o => (
          <div key={o.MaDH} className="card" style={{ marginBottom:16, cursor:'pointer' }} onClick={() => setDetail(o)}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
              <div>
                <span style={{ fontWeight:700, fontSize:16 }}>{o.MaDH}</span>
                <span style={{ color:'var(--text-muted)', marginLeft:12, fontSize:13 }}>{formatDate(o.NgayDat)}</span>
              </div>
              <span className="badge" style={{ background:`${getStatusColor(o.TrangThai)}20`, color:getStatusColor(o.TrangThai) }}>{o.TrangThai}</span>
            </div>
            <div style={{ display:'flex', gap:12, marginTop:12, flexWrap:'wrap' }}>
              {orderDetails.filter(od => od.MaDH === o.MaDH).map((od, i) => {
                const p = products.find(p => p.MaSP === od.MaSP);
                return <span key={i} style={{ fontSize:13, color:'var(--text-secondary)', display:'inline-flex', alignItems:'center', gap:6 }}><img src={p?.HinhAnh} alt={p?.TenSP} style={{ width:24, height:24, objectFit:'cover', borderRadius:4 }} />{p?.TenSP} ×{od.SoLuong}</span>;
              })}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:12, alignItems:'center' }}>
              <span style={{ fontSize:13, color:'var(--text-muted)' }}>{shippingProviders.find(s=>s.MaDVVC===o.MaDVVC)?.TenDVVC}</span>
              <span style={{ fontSize:18, fontWeight:700, color:'var(--accent-light)' }}>{formatCurrency(o.TongTien)}</span>
            </div>
          </div>
        ))
      )}

      {detail && (
        <div className="modal-overlay" onClick={() => setDetail(null)}>
          <div className="modal" style={{ maxWidth:650 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3 style={{ display:'flex', alignItems:'center', gap:8 }}><ClipboardList size={20} /> Đơn hàng {detail.MaDH}</h3><button className="btn btn-icon btn-secondary" onClick={() => setDetail(null)}>✕</button></div>
            <div className="modal-body">
              {/* Timeline */}
              <div style={{ display:'flex', justifyContent:'center', gap:0, marginBottom:24 }}>
                {STATUS_FLOW.map((s, i) => {
                  const cur = orders.find(o=>o.MaDH===detail.MaDH);
                  const currentIdx = STATUS_FLOW.indexOf(cur?.TrangThai);
                  const done = i < currentIdx; const active = i === currentIdx;
                  return (
                    <div key={s} style={{ display:'flex', alignItems:'center' }}>
                      <div style={{ textAlign:'center' }}>
                        <div style={{ width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, background: done?'var(--success)':active?'var(--accent)':'var(--bg-glass)', color: done||active?'#fff':'var(--text-muted)', border:`2px solid ${done?'var(--success)':active?'var(--accent)':'var(--border)'}` }}>{done ? <Check size={14}/> : i+1}</div>
                        <div style={{ fontSize:10, color: active?'var(--accent-light)':'var(--text-muted)', marginTop:4, maxWidth:65 }}>{s}</div>
                      </div>
                      {i < STATUS_FLOW.length-1 && <div style={{ width:30, height:2, background: done?'var(--success)':'var(--border)', margin:'0 2px' }} />}
                    </div>
                  );
                })}
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 }}>
                <div><div style={{ fontSize:12, color:'var(--text-muted)' }}>Địa chỉ</div><div style={{ fontSize:13 }}>{detail.DiaChiGiao}</div></div>
                <div><div style={{ fontSize:12, color:'var(--text-muted)' }}>Thanh toán</div><div style={{ fontSize:13 }}>{paymentMethods.find(p=>p.MaPTTT===detail.MaPTTT)?.TenPTTT}</div></div>
              </div>

              <h4 style={{ marginBottom:8 }}>Sản phẩm</h4>
              {orderDetails.filter(od=>od.MaDH===detail.MaDH).map((od,i) => {
                const p = products.find(p=>p.MaSP===od.MaSP);
                return <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)', fontSize:14 }}><span style={{ display:'flex', alignItems:'center', gap:8 }}><img src={p?.HinhAnh} alt={p?.TenSP} style={{ width:32, height:32, objectFit:'cover', borderRadius:4 }} />{p?.TenSP} ×{od.SoLuong}</span><span style={{ fontWeight:600 }}>{formatCurrency(od.DonGia*od.SoLuong)}</span></div>;
              })}
              <div style={{ textAlign:'right', marginTop:12, fontSize:18, fontWeight:700, color:'var(--accent-light)' }}>Tổng: {formatCurrency(detail.TongTien)}</div>

              {orders.find(o=>o.MaDH===detail.MaDH)?.TrangThai === 'Chờ xác nhận' && (
                <button className="btn btn-danger" style={{ width:'100%', marginTop:16, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }} onClick={() => setCancelModal(detail.MaDH)}><X size={18} /> Hủy đơn hàng</button>
              )}
            </div>
          </div>
        </div>
      )}

      {cancelModal && (
        <div className="modal-overlay" onClick={() => setCancelModal(null)} style={{ zIndex: 1100 }}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--danger)' }}>
                <AlertTriangle size={20} /> Xác nhận hủy
              </h3>
              <button className="btn btn-icon btn-secondary" onClick={() => setCancelModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setCancelModal(null)}>Trở lại</button>
              <button className="btn btn-danger" onClick={confirmCancel} style={{ display:'flex', alignItems:'center', gap:6 }}><X size={18} /> Hủy đơn</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
