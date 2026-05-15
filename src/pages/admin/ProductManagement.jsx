import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useNotification } from '../../context/NotificationContext';
import { formatCurrency } from '../../utils/helpers';
import { Package, Search, Edit, Trash2, Save, AlertTriangle, Plus } from 'lucide-react';


export default function ProductManagement() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData();
  const { showToast } = useNotification();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | product object
  const [form, setForm] = useState({});
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = products.filter(p => {
    if (search && !p.TenSP.toLowerCase().includes(search.toLowerCase())) return false;
    if (catFilter && p.MaDM !== catFilter) return false;
    return true;
  });
  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page-1)*perPage, page*perPage);

  const openAdd = () => { setForm({ TenSP:'', GiaBan:'', GiaGoc:'', SoLuongTon:'', MaDM:'DM001', MoTa:'', HinhAnh:'📦', TrangThai:'Active' }); setModal('add'); };
  const openEdit = (p) => { setForm({...p}); setModal(p); };

  const handleSave = () => {
    if (!form.TenSP || !form.GiaBan) { showToast('Vui lòng nhập đủ thông tin','error'); return; }
    const data = { ...form, GiaBan: Number(form.GiaBan), GiaGoc: Number(form.GiaGoc) || Number(form.GiaBan), SoLuongTon: Number(form.SoLuongTon) || 0 };
    if (modal === 'add') { addProduct(data); showToast('Thêm sản phẩm thành công!','success'); }
    else { updateProduct(modal.MaSP, data); showToast('Cập nhật thành công!','success'); }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (confirm('Xác nhận xóa sản phẩm này?')) { deleteProduct(id); showToast('Đã xóa sản phẩm','success'); }
  };

  return (
    <div className="slide-up">
      <div className="page-header">
        <div><h1 className="page-title" style={{ display:'flex', alignItems:'center', gap:12 }}><Package size={28} color="var(--accent)" /> Quản lý sản phẩm</h1><p className="page-subtitle">{products.length} sản phẩm</p></div>
        <button className="btn btn-primary" onClick={openAdd} style={{ display:'flex', alignItems:'center', gap:8 }}><Plus size={18} /> Thêm sản phẩm</button>
      </div>

      <div className="filter-bar">
        <div className="search-input"><span className="search-icon"><Search size={18} /></span><input className="input" placeholder="Tìm sản phẩm..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} style={{ paddingLeft:36 }} /></div>
        <select className="select" style={{ width:180 }} value={catFilter} onChange={e => { setCatFilter(e.target.value); setPage(1); }}>
          <option value="">Tất cả danh mục</option>
          {categories.map(c => <option key={c.MaDM} value={c.MaDM}>{c.TenDM}</option>)}
        </select>
      </div>

      <div className="card" style={{ padding:0 }}>
        <div className="table-container">
          <table className="table">
            <thead><tr><th></th><th>Tên sản phẩm</th><th>Danh mục</th><th>Giá bán</th><th>Giá gốc</th><th>Tồn kho</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              {paged.map(p => (
                <tr key={p.MaSP}>
                  <td><img src={p.HinhAnh} alt={p.TenSP} style={{ width:44, height:44, objectFit:'cover', borderRadius:8 }} /></td>
                  <td><div style={{ fontWeight:600 }}>{p.TenSP}</div><div style={{ fontSize:12, color:'var(--text-muted)' }}>{p.MaSP}</div></td>
                  <td>{categories.find(c => c.MaDM === p.MaDM)?.TenDM}</td>
                  <td style={{ color:'var(--danger)', fontWeight:600 }}>{formatCurrency(p.GiaBan)}</td>
                  <td style={{ color:'var(--text-muted)', textDecoration:'line-through' }}>{formatCurrency(p.GiaGoc)}</td>
                  <td><span style={{ display:'flex', alignItems:'center', gap:6, color: p.SoLuongTon < 5 ? 'var(--danger)' : p.SoLuongTon < 10 ? 'var(--warning)' : 'var(--success)', fontWeight:600 }}>{p.SoLuongTon}{p.SoLuongTon < 5 && <AlertTriangle size={14} />}</span></td>
                  <td><span className={`badge badge-${p.TrangThai === 'Active' ? 'success' : 'danger'}`}>{p.TrangThai}</span></td>
                  <td><div style={{ display:'flex', gap:6 }}><button className="btn btn-secondary btn-sm" onClick={() => openEdit(p)}><Edit size={16} /></button><button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.MaSP)}><Trash2 size={16} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" disabled={page===1} onClick={() => setPage(page-1)}>‹</button>
          {Array.from({length: totalPages}, (_, i) => <button key={i} className={`page-btn ${page===i+1?'active':''}`} onClick={() => setPage(i+1)}>{i+1}</button>)}
          <button className="page-btn" disabled={page===totalPages} onClick={() => setPage(page+1)}>›</button>
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>{modal === 'add' ? 'Thêm sản phẩm' : 'Sửa sản phẩm'}</h3><button className="btn btn-icon btn-secondary" onClick={() => setModal(null)}>✕</button></div>
            <div className="modal-body">
              <div className="form-group" style={{marginBottom:16}}><label className="form-label">Tên sản phẩm *</label><input className="input" value={form.TenSP||''} onChange={e => setForm({...form, TenSP:e.target.value})} /></div>
              <div className="form-row" style={{marginBottom:16}}>
                <div className="form-group"><label className="form-label">Giá bán *</label><input className="input" type="number" value={form.GiaBan||''} onChange={e => setForm({...form, GiaBan:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Giá gốc</label><input className="input" type="number" value={form.GiaGoc||''} onChange={e => setForm({...form, GiaGoc:e.target.value})} /></div>
              </div>
              <div className="form-row" style={{marginBottom:16}}>
                <div className="form-group"><label className="form-label">Tồn kho</label><input className="input" type="number" value={form.SoLuongTon||''} onChange={e => setForm({...form, SoLuongTon:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Danh mục</label><select className="select" value={form.MaDM||''} onChange={e => setForm({...form, MaDM:e.target.value})}>{categories.map(c => <option key={c.MaDM} value={c.MaDM}>{c.TenDM}</option>)}</select></div>
              </div>
              <div className="form-group" style={{marginBottom:16}}><label className="form-label">Mô tả</label><textarea className="textarea" value={form.MoTa||''} onChange={e => setForm({...form, MoTa:e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Emoji icon</label><input className="input" value={form.HinhAnh||''} onChange={e => setForm({...form, HinhAnh:e.target.value})} /></div>
            </div>
            <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setModal(null)}>Hủy</button><button className="btn btn-primary" onClick={handleSave} style={{ display:'flex', alignItems:'center', gap:6 }}><Save size={18} /> Lưu</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
