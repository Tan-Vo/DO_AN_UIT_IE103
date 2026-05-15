import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { formatCurrency, formatDate, calcDiscount } from '../../utils/helpers';
import { Star, ShoppingCart, Zap, MessageSquare, PenLine, User, Layers, ArrowLeft } from 'lucide-react';


export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories, reviews, addReview } = useData();
  const { addItem } = useCart();
  const { user } = useAuth();
  const { showToast } = useNotification();
  const [qty, setQty] = useState(1);
  const [reviewForm, setReviewForm] = useState({ SoSao: 5, NoiDung: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const product = products.find(p => p.MaSP === id);
  if (!product) return <div style={{ textAlign:'center', padding:60 }}><h2>Sản phẩm không tồn tại</h2><button className="btn btn-primary" onClick={() => navigate('/')}>Về trang chủ</button></div>;

  const productReviews = reviews.filter(r => r.MaSP === id);
  const relatedProducts = products.filter(p => p.MaDM === product.MaDM && p.MaSP !== id).slice(0, 4);

  const handleAddCart = () => {
    if (product.SoLuongTon < 1) { showToast('Sản phẩm đã hết hàng', 'error'); return; }
    addItem(product, qty);
    showToast(`Đã thêm ${qty} ${product.TenSP} vào giỏ hàng!`, 'success');
  };

  const handleBuyNow = () => { handleAddCart(); navigate('/cart'); };

  const handleSubmitReview = () => {
    if (!reviewForm.NoiDung.trim()) { showToast('Vui lòng nhập nội dung đánh giá', 'error'); return; }
    addReview({ MaSP: id, MaKH: user.id, SoSao: reviewForm.SoSao, NoiDung: reviewForm.NoiDung });
    showToast('Cảm ơn bạn đã đánh giá!', 'success');
    setShowReviewForm(false);
    setReviewForm({ SoSao: 5, NoiDung: '' });
  };

  return (
    <div className="slide-up">
      <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)} style={{ marginBottom:20, display:'flex', alignItems:'center', gap:6 }}><ArrowLeft size={16} /> Quay lại</button>
      <div className="product-detail">
        <div className="pd-image"><img src={product.HinhAnh} alt={product.TenSP} style={{ width:'100%', height:'100%', objectFit:'contain' }} /></div>
        <div className="pd-info">
          <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:8 }}>{categories.find(c => c.MaDM === product.MaDM)?.TenDM} | {product.MaSP}</div>
          <h1>{product.TenSP}</h1>
          <div className="pd-rating" style={{ display:'flex', alignItems:'center', gap:4 }}><Star size={16} fill="currentColor" color="var(--warning)" /> {product.DanhGiaTB} ({productReviews.length} đánh giá)</div>
          <div className="pd-prices">
            <span className="pd-sale">{formatCurrency(product.GiaBan)}</span>
            {product.GiaGoc > product.GiaBan && <span className="pd-orig">{formatCurrency(product.GiaGoc)}</span>}
            {product.GiaGoc > product.GiaBan && <span className="discount-badge" style={{ fontSize:14, padding:'4px 12px' }}>-{calcDiscount(product.GiaGoc, product.GiaBan)}%</span>}
          </div>
          <p className="pd-desc">{product.MoTa}</p>
          <div style={{ marginBottom:16, fontSize:14 }}>
            Tồn kho: <span style={{ color: product.SoLuongTon < 5 ? 'var(--danger)' : 'var(--success)', fontWeight:600 }}>{product.SoLuongTon} sản phẩm</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24 }}>
            <span style={{ fontSize:14 }}>Số lượng:</span>
            <div className="qty-selector">
              <button onClick={() => setQty(Math.max(1, qty-1))}>−</button>
              <input value={qty} onChange={e => setQty(Math.max(1, Math.min(product.SoLuongTon, Number(e.target.value)||1)))} />
              <button onClick={() => setQty(Math.min(product.SoLuongTon, qty+1))}>+</button>
            </div>
          </div>
          <div style={{ display:'flex', gap:12 }}>
            <button className="btn btn-primary btn-lg" onClick={handleAddCart} disabled={product.SoLuongTon===0} style={{ display:'flex', alignItems:'center', gap:8 }}><ShoppingCart size={18} /> Thêm vào giỏ</button>
            <button className="btn btn-success btn-lg" onClick={handleBuyNow} disabled={product.SoLuongTon===0} style={{ background:'var(--success)', color:'#fff', display:'flex', alignItems:'center', gap:8 }}><Zap size={18} /> Mua ngay</button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="card" style={{ marginTop:40 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <h3 style={{ display:'flex', alignItems:'center', gap:8 }}><MessageSquare size={20} /> Đánh giá sản phẩm ({productReviews.length})</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setShowReviewForm(!showReviewForm)} style={{ display:'flex', alignItems:'center', gap:6 }}><PenLine size={16} /> Viết đánh giá</button>
        </div>
        {showReviewForm && (
          <div className="card-glass" style={{ marginBottom:20, padding:20 }}>
            <div style={{ display:'flex', gap:4, marginBottom:12 }}>
              {[1,2,3,4,5].map(s => <span key={s} className="star-icon" style={{ cursor:'pointer', color: s <= reviewForm.SoSao ? 'var(--warning)' : 'var(--border)' }} onClick={() => setReviewForm({...reviewForm, SoSao: s})}><Star size={24} fill={s <= reviewForm.SoSao ? 'currentColor' : 'none'} /></span>)}
            </div>
            <textarea className="textarea" placeholder="Chia sẻ trải nghiệm của bạn..." value={reviewForm.NoiDung} onChange={e => setReviewForm({...reviewForm, NoiDung: e.target.value})} style={{ marginBottom:12 }} />
            <div style={{ display:'flex', gap:8 }}>
              <button className="btn btn-primary btn-sm" onClick={handleSubmitReview}>Gửi đánh giá</button>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowReviewForm(false)}>Hủy</button>
            </div>
          </div>
        )}
        {productReviews.length === 0 ? (
          <p style={{ color:'var(--text-muted)', textAlign:'center', padding:20 }}>Chưa có đánh giá nào</p>
        ) : (
          productReviews.map(r => (
            <div key={r.MaDG} style={{ padding:'16px 0', borderBottom:'1px solid var(--border)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}><User size={14} /> <span style={{ fontWeight:600 }}>Khách hàng</span> <span style={{ display:'flex', gap:2, color:'var(--warning)' }}>{Array(r.SoSao).fill(0).map((_,i) => <Star key={i} size={12} fill="currentColor" />)}</span></div>
                <span style={{ fontSize:12, color:'var(--text-muted)' }}>{formatDate(r.NgayDG)}</span>
              </div>
              <p style={{ color:'var(--text-secondary)' }}>{r.NoiDung}</p>
            </div>
          ))
        )}
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop:40 }}>
          <h3 style={{ marginBottom:16, display:'flex', alignItems:'center', gap:8 }}><Layers size={20} /> Sản phẩm liên quan</h3>
          <div className="product-grid" style={{ gridTemplateColumns:'repeat(4, 1fr)' }}>
            {relatedProducts.map(p => (
              <div className="product-card" key={p.MaSP} onClick={() => { navigate(`/product/${p.MaSP}`); window.scrollTo(0,0); }}>
                <div className="product-img" style={{ height:120 }}><img src={p.HinhAnh} alt={p.TenSP} style={{ width:'100%', height:'100%', objectFit:'cover' }} /></div>
                <div className="product-body" style={{ padding:12 }}>
                  <div className="product-name" style={{ fontSize:13 }}>{p.TenSP}</div>
                  <div className="price-sale" style={{ fontSize:15 }}>{formatCurrency(p.GiaBan)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
