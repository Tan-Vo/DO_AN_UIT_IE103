import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { formatCurrency, calcDiscount } from '../../utils/helpers';
import { ShoppingBag, Search, Star, AlertTriangle, XCircle, ShoppingCart } from 'lucide-react';


export default function Home() {
  const { products, categories } = useData();
  const { addItem } = useCart();
  const { showToast } = useNotification();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const perPage = 12;

  let filtered = products.filter(p => p.TrangThai === 'Active').filter(p => {
    if (search && !p.TenSP.toLowerCase().includes(search.toLowerCase())) return false;
    if (catFilter && p.MaDM !== catFilter) return false;
    return true;
  });

  if (sort === 'price-asc') filtered.sort((a,b) => a.GiaBan - b.GiaBan);
  else if (sort === 'price-desc') filtered.sort((a,b) => b.GiaBan - a.GiaBan);
  else if (sort === 'rating') filtered.sort((a,b) => b.DanhGiaTB - a.DanhGiaTB);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page-1)*perPage, page*perPage);

  const handleAdd = (p, e) => {
    e.stopPropagation();
    if (p.SoLuongTon < 1) { showToast('Sản phẩm đã hết hàng', 'error'); return; }
    addItem(p);
    showToast(`Đã thêm ${p.TenSP} vào giỏ hàng!`, 'success');
  };

  return (
    <div>
      <div className="hero">
        <h1 style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12 }}>Chào mừng đến Đồ án 103 <ShoppingBag size={36} color="var(--accent)" /></h1>
        <p>Mua sắm thông minh – Giá tốt mỗi ngày – Giao hàng siêu tốc</p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', maxWidth:600, margin:'0 auto', position:'relative' }}>
          <Search size={20} style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }} />
          <input className="input" placeholder="Tìm kiếm sản phẩm..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} style={{ flex:1, paddingLeft:44 }} />
        </div>
      </div>

      <div className="filter-bar">
        <select className="select" style={{ width:180 }} value={catFilter} onChange={e => { setCatFilter(e.target.value); setPage(1); }}>
          <option value="">Tất cả danh mục</option>
          {categories.map(c => <option key={c.MaDM} value={c.MaDM}>{c.TenDM}</option>)}
        </select>
        <select className="select" style={{ width:180 }} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="newest">Mới nhất</option>
          <option value="price-asc">Giá thấp → cao</option>
          <option value="price-desc">Giá cao → thấp</option>
          <option value="rating">Đánh giá cao</option>
        </select>
        <span style={{ fontSize:13, color:'var(--text-muted)' }}>{filtered.length} sản phẩm</span>
      </div>

      {paged.length === 0 ? (
        <div style={{ textAlign:'center', padding:60, color:'var(--text-muted)' }}>
          <div style={{ marginBottom:16 }}><Search size={48} color="var(--text-muted)" /></div>
          <p>Không tìm thấy sản phẩm phù hợp</p>
          <button className="btn btn-secondary" style={{ marginTop:12 }} onClick={() => { setSearch(''); setCatFilter(''); }}>Xóa bộ lọc</button>
        </div>
      ) : (
        <div className="product-grid">
          {paged.map(p => (
            <div className="product-card" key={p.MaSP} onClick={() => navigate(`/product/${p.MaSP}`)}>
              <div className="product-img"><img src={p.HinhAnh} alt={p.TenSP} style={{ width:'100%', height:'100%', objectFit:'cover' }} /></div>
              <div className="product-body">
                <div className="product-cat">{categories.find(c => c.MaDM === p.MaDM)?.TenDM}</div>
                <div className="product-name">{p.TenSP}</div>
                <div className="product-price">
                  <span className="price-sale">{formatCurrency(p.GiaBan)}</span>
                  {p.GiaGoc > p.GiaBan && <span className="price-original">{formatCurrency(p.GiaGoc)}</span>}
                  {p.GiaGoc > p.GiaBan && <span className="discount-badge">-{calcDiscount(p.GiaGoc, p.GiaBan)}%</span>}
                </div>
                <div className="product-rating" style={{ display:'flex', alignItems:'center', gap:4 }}><Star size={14} fill="currentColor" color="var(--warning)" /> {p.DanhGiaTB}</div>
                {p.SoLuongTon < 5 && p.SoLuongTon > 0 && <div className="stock-low" style={{ display:'flex', alignItems:'center', gap:4 }}><AlertTriangle size={14} /> Chỉ còn {p.SoLuongTon} sản phẩm</div>}
                {p.SoLuongTon === 0 && <div className="stock-out" style={{ display:'flex', alignItems:'center', gap:4 }}><XCircle size={14} /> Hết hàng</div>}
                <div className="product-actions">
                  <button className="btn btn-primary btn-sm" onClick={(e) => handleAdd(p, e)} disabled={p.SoLuongTon === 0} style={{ display:'flex', alignItems:'center', gap:6 }}><ShoppingCart size={14}/> Thêm giỏ</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" disabled={page===1} onClick={() => setPage(page-1)}>‹ Trước</button>
          <span style={{ fontSize:14, color:'var(--text-secondary)' }}>Trang {page}/{totalPages}</span>
          <button className="page-btn" disabled={page===totalPages} onClick={() => setPage(page+1)}>Sau ›</button>
        </div>
      )}
    </div>
  );
}
