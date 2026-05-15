import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useData } from '../../context/DataContext';
import { useNotification } from '../../context/NotificationContext';
import { formatCurrency } from '../../utils/helpers';
import { ShoppingCart, ShoppingBag, Trash2, ClipboardList, CreditCard, X, ArrowLeft } from 'lucide-react';


export default function Cart() {
  const { items, removeItem, updateQty, clearCart, subtotal, voucher, discount, applyVoucher, removeVoucher } = useCart();
  const { validateVoucher } = useData();
  const { showToast } = useNotification();
  const navigate = useNavigate();
  const [voucherCode, setVoucherCode] = useState('');

  const handleApplyVoucher = () => {
    if (!voucherCode.trim()) return;
    const result = validateVoucher(voucherCode.toUpperCase(), subtotal);
    if (result.valid) {
      applyVoucher(result.voucher, result.discount);
      showToast(`Áp dụng thành công! Giảm ${formatCurrency(result.discount)}`, 'success');
    } else {
      showToast(result.msg, 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ textAlign:'center', padding:80 }}>
        <div style={{ marginBottom:16 }}><ShoppingCart size={64} color="var(--text-muted)" /></div>
        <h2 style={{ marginBottom:8 }}>Giỏ hàng trống</h2>
        <p style={{ color:'var(--text-secondary)', marginBottom:24 }}>Hãy thêm sản phẩm yêu thích vào giỏ hàng</p>
        <button className="btn btn-primary" onClick={() => navigate('/')} style={{ display:'inline-flex', alignItems:'center', gap:8 }}><ShoppingBag size={18} /> Tiếp tục mua sắm</button>
      </div>
    );
  }

  return (
    <div className="slide-up">
      <div className="page-header">
        <h1 className="page-title" style={{ display:'flex', alignItems:'center', gap:12 }}><ShoppingCart size={28} color="var(--accent)" /> Giỏ hàng ({items.length} sản phẩm)</h1>
        <button className="btn btn-danger btn-sm" onClick={() => { clearCart(); showToast('Đã xóa giỏ hàng','success'); }} style={{ display:'flex', alignItems:'center', gap:6 }}><Trash2 size={16} /> Xóa tất cả</button>
      </div>

      <div className="cart-layout">
        <div className="card" style={{ padding:0 }}>
          {items.map(item => (
            <div className="cart-item" key={item.MaSP}>
              <div className="cart-item-img"><img src={item.HinhAnh} alt={item.TenSP} style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:6 }} /></div>
              <div className="cart-item-info">
                <div className="cart-item-name" style={{ cursor:'pointer' }} onClick={() => navigate(`/product/${item.MaSP}`)}>{item.TenSP}</div>
                <div className="cart-item-price">{formatCurrency(item.GiaBan)}</div>
              </div>
              <div className="qty-selector">
                <button onClick={() => updateQty(item.MaSP, item.SoLuong - 1)}>−</button>
                <input value={item.SoLuong} onChange={e => updateQty(item.MaSP, Number(e.target.value)||1)} />
                <button onClick={() => updateQty(item.MaSP, item.SoLuong + 1)}>+</button>
              </div>
              <div style={{ fontWeight:700, minWidth:120, textAlign:'right' }}>{formatCurrency(item.GiaBan * item.SoLuong)}</div>
              <button className="btn btn-icon btn-danger btn-sm" onClick={() => { removeItem(item.MaSP); showToast('Đã xóa sản phẩm','success'); }}>✕</button>
            </div>
          ))}
        </div>

        <div className="card cart-summary">
          <h3 style={{ marginBottom:16, display:'flex', alignItems:'center', gap:8 }}><ClipboardList size={20} /> Tóm tắt đơn hàng</h3>
          <div className="summary-row"><span>Tạm tính</span><span>{formatCurrency(subtotal)}</span></div>
          {voucher && <div className="summary-row" style={{ color:'var(--success)' }}><span>Giảm giá ({voucher.MaVoucher})</span><span>-{formatCurrency(discount)}</span></div>}
          <div className="summary-row"><span>Phí vận chuyển</span><span style={{ color:'var(--text-muted)' }}>Tính khi thanh toán</span></div>
          <div className="summary-total"><span>Tổng cộng</span><span style={{ color:'var(--accent-light)' }}>{formatCurrency(subtotal - discount)}</span></div>

          <div className="voucher-input">
            <input className="input" placeholder="Nhập mã giảm giá" value={voucherCode} onChange={e => setVoucherCode(e.target.value)} />
            <button className="btn btn-secondary btn-sm" onClick={handleApplyVoucher}>Áp dụng</button>
          </div>
          {voucher && <button className="btn btn-sm" style={{ marginTop:8, fontSize:12, color:'var(--danger)', background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center', gap:4 }} onClick={() => { removeVoucher(); setVoucherCode(''); showToast('Đã hủy voucher','info'); }}><X size={14} /> Hủy voucher</button>}

          <button className="btn btn-primary btn-lg" style={{ width:'100%', marginTop:20, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }} onClick={() => navigate('/checkout')}><CreditCard size={18} /> Thanh toán</button>
          <button className="btn btn-secondary" style={{ width:'100%', marginTop:8, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }} onClick={() => navigate('/')}><ArrowLeft size={16} /> Tiếp tục mua sắm</button>
        </div>
      </div>
    </div>
  );
}
