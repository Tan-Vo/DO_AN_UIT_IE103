import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { formatCurrency } from '../../utils/helpers';
import { CreditCard, MapPin, Truck, ClipboardList, CheckCircle, Package, ShoppingBag, ArrowLeft, ArrowRight, Check, Clock } from 'lucide-react';


export default function Checkout() {
  const { items, subtotal, voucher, discount, clearCart } = useCart();
  const { shippingProviders, paymentMethods, createOrder } = useData();
  const { user } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState('');

  const [address, setAddress] = useState({ TenNguoiNhan: user?.profile?.TenKH || '', SoDT: user?.profile?.SoDT || '', DiaChi: user?.profile?.DiaChi || '' });
  const [shipping, setShipping] = useState('DVVC001');
  const [payment, setPayment] = useState('PTTT001');

  const shippingFee = shippingProviders.find(s => s.MaDVVC === shipping)?.PhiVC || 0;
  const total = subtotal - discount + shippingFee;

  if (items.length === 0 && !orderId) { navigate('/cart'); return null; }

  const steps = ['Địa chỉ', 'Vận chuyển', 'Thanh toán', 'Xác nhận'];

  const handleConfirm = () => {
    const order = {
      NgayDat: new Date().toISOString().split('T')[0],
      MaKH: user.id, MaNV: null, MaDVVC: shipping, MaPTTT: payment,
      MaVoucher: voucher?.MaVoucher || null,
      TongTien: total, PhiVC: shippingFee,
      DiaChiGiao: address.DiaChi, TrangThai: 'Chờ xác nhận'
    };
    const orderItems = items.map(i => ({ MaSP: i.MaSP, SoLuong: i.SoLuong, DonGia: i.GiaBan }));
    const id = createOrder(order, orderItems);
    setOrderId(id);
    clearCart();
    setStep(5);
    showToast('Đặt hàng thành công!', 'success');
  };

  const canNext = () => {
    if (step === 1) return address.TenNguoiNhan && address.SoDT && address.DiaChi;
    return true;
  };

  return (
    <div className="slide-up" style={{ maxWidth:800, margin:'0 auto' }}>
      <h1 className="page-title" style={{ marginBottom:24, display:'flex', alignItems:'center', gap:12 }}><CreditCard size={32} color="var(--accent)" /> Thanh toán</h1>

      {step < 5 && (
        <div className="checkout-steps">
          {steps.map((s, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center' }}>
              <div className={`step ${i+1 === step ? 'active' : ''} ${i+1 < step ? 'done' : ''}`}>
                <span className="step-num">{i+1 < step ? <Check size={16} /> : i+1}</span>
                <span>{s}</span>
              </div>
              {i < steps.length-1 && <div className={`step-line ${i+1 < step ? 'done' : ''}`} />}
            </div>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="card">
          <h3 style={{ marginBottom:20, display:'flex', alignItems:'center', gap:8 }}><MapPin size={20} /> Địa chỉ giao hàng</h3>
          <div className="form-group" style={{marginBottom:16}}><label className="form-label">Tên người nhận *</label><input className="input" value={address.TenNguoiNhan} onChange={e => setAddress({...address, TenNguoiNhan: e.target.value})} /></div>
          <div className="form-group" style={{marginBottom:16}}><label className="form-label">Số điện thoại *</label><input className="input" value={address.SoDT} onChange={e => setAddress({...address, SoDT: e.target.value})} /></div>
          <div className="form-group" style={{marginBottom:16}}><label className="form-label">Địa chỉ chi tiết *</label><textarea className="textarea" value={address.DiaChi} onChange={e => setAddress({...address, DiaChi: e.target.value})} /></div>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h3 style={{ marginBottom:20, display:'flex', alignItems:'center', gap:8 }}><Truck size={20} /> Phương thức vận chuyển</h3>
          {shippingProviders.map(s => (
            <label key={s.MaDVVC} style={{ display:'flex', alignItems:'center', gap:16, padding:16, borderRadius:8, border:`2px solid ${shipping===s.MaDVVC?'var(--accent)':'var(--border)'}`, cursor:'pointer', marginBottom:12, background: shipping===s.MaDVVC ? 'rgba(108,92,231,0.1)' : 'transparent', transition:'var(--transition)' }}>
              <input type="radio" name="shipping" checked={shipping===s.MaDVVC} onChange={() => setShipping(s.MaDVVC)} />
              <div style={{ flex:1 }}><div style={{ fontWeight:600 }}>{s.TenDVVC}</div><div style={{ fontSize:13, color:'var(--text-muted)', display:'flex', alignItems:'center', gap:4, marginTop:4 }}><Clock size={14}/> {s.TGDuKien}</div></div>
              <div style={{ fontWeight:700, color:'var(--accent-light)' }}>{formatCurrency(s.PhiVC)}</div>
            </label>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h3 style={{ marginBottom:20, display:'flex', alignItems:'center', gap:8 }}><CreditCard size={20} /> Phương thức thanh toán</h3>
          {paymentMethods.map(p => (
            <label key={p.MaPTTT} style={{ display:'flex', alignItems:'center', gap:16, padding:16, borderRadius:8, border:`2px solid ${payment===p.MaPTTT?'var(--accent)':'var(--border)'}`, cursor:'pointer', marginBottom:12, background: payment===p.MaPTTT ? 'rgba(108,92,231,0.1)' : 'transparent' }}>
              <input type="radio" name="payment" checked={payment===p.MaPTTT} onChange={() => setPayment(p.MaPTTT)} />
              <div style={{ fontWeight:600 }}>{p.TenPTTT}</div>
            </label>
          ))}
        </div>
      )}

      {step === 4 && (
        <div className="card">
          <h3 style={{ marginBottom:20, display:'flex', alignItems:'center', gap:8 }}><ClipboardList size={20} /> Xác nhận đơn hàng</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
            <div><div style={{ fontSize:12, color:'var(--text-muted)' }}>Người nhận</div><div style={{ fontWeight:500 }}>{address.TenNguoiNhan}</div></div>
            <div><div style={{ fontSize:12, color:'var(--text-muted)' }}>SĐT</div><div style={{ fontWeight:500 }}>{address.SoDT}</div></div>
            <div style={{ gridColumn:'1/-1' }}><div style={{ fontSize:12, color:'var(--text-muted)' }}>Địa chỉ</div><div style={{ fontWeight:500 }}>{address.DiaChi}</div></div>
            <div><div style={{ fontSize:12, color:'var(--text-muted)' }}>Vận chuyển</div><div style={{ fontWeight:500 }}>{shippingProviders.find(s=>s.MaDVVC===shipping)?.TenDVVC}</div></div>
            <div><div style={{ fontSize:12, color:'var(--text-muted)' }}>Thanh toán</div><div style={{ fontWeight:500 }}>{paymentMethods.find(p=>p.MaPTTT===payment)?.TenPTTT}</div></div>
          </div>
          <h4 style={{ marginBottom:12, display:'flex', alignItems:'center', gap:8 }}><Package size={18} /> Sản phẩm</h4>
          {items.map(i => (
            <div key={i.MaSP} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
              <span><img src={i.HinhAnh} alt={i.TenSP} style={{ width:28, height:28, objectFit:'cover', borderRadius:4, verticalAlign:'middle', marginRight:8 }} />{i.TenSP} × {i.SoLuong}</span>
              <span style={{ fontWeight:600 }}>{formatCurrency(i.GiaBan * i.SoLuong)}</span>
            </div>
          ))}
          <div style={{ marginTop:16 }}>
            <div className="summary-row"><span>Tạm tính</span><span>{formatCurrency(subtotal)}</span></div>
            {discount > 0 && <div className="summary-row" style={{ color:'var(--success)' }}><span>Giảm giá</span><span>-{formatCurrency(discount)}</span></div>}
            <div className="summary-row"><span>Phí vận chuyển</span><span>{formatCurrency(shippingFee)}</span></div>
            <div className="summary-total"><span>Tổng thanh toán</span><span style={{ color:'var(--accent-light)', fontSize:24 }}>{formatCurrency(total)}</span></div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="card" style={{ textAlign:'center', padding:40 }}>
          <div style={{ marginBottom:24 }}><CheckCircle size={80} color="var(--success)" /></div>
          <h2 style={{ marginBottom:8 }}>Đặt hàng thành công!</h2>
          <p style={{ color:'var(--text-secondary)', marginBottom:8 }}>Mã đơn hàng của bạn</p>
          <div style={{ fontSize:28, fontWeight:800, color:'var(--accent-light)', marginBottom:24 }}>{orderId}</div>
          <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/orders')} style={{ display:'flex', alignItems:'center', gap:8 }}><ClipboardList size={18} /> Xem đơn hàng</button>
            <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ display:'flex', alignItems:'center', gap:8 }}><ShoppingBag size={18} /> Tiếp tục mua sắm</button>
          </div>
        </div>
      )}

      {step < 5 && (
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:24 }}>
          <button className="btn btn-secondary" onClick={() => step > 1 ? setStep(step-1) : navigate('/cart')} style={{ display:'flex', alignItems:'center', gap:6 }}><ArrowLeft size={16} /> {step===1?'Giỏ hàng':'Quay lại'}</button>
          {step < 4 ? (
            <button className="btn btn-primary" onClick={() => setStep(step+1)} disabled={!canNext()} style={{ display:'flex', alignItems:'center', gap:6 }}>Tiếp theo <ArrowRight size={16} /></button>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={handleConfirm} style={{ display:'flex', alignItems:'center', gap:8 }}><Check size={18} /> Xác nhận đặt hàng</button>
          )}
        </div>
      )}
    </div>
  );
}
