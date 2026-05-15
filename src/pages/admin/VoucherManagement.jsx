import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useNotification } from '../../context/NotificationContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { Ticket, Plus, Edit, Trash2, Save, AlertTriangle } from 'lucide-react';


export default function VoucherManagement() {
  const { vouchers, addVoucher, updateVoucher, deleteVoucher } = useData();
  const { showToast } = useNotification();
  const [modal, setModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [form, setForm] = useState({});

  const openAdd = () => { setForm({ MaVoucher:'', GiaTri:'', KieuGiam:'Percent', DieuKien:'', GiamToiDa:'', NgayBD:'', NgayKT:'', SoLuongMa:'', TrangThai:'Active', DaDung:0 }); setModal('add'); };
  const openEdit = (v) => { setForm({...v}); setModal(v); };

  const handleSave = () => {
    if (!form.MaVoucher || !form.GiaTri) { showToast('Vui lòng nhập đủ thông tin', 'error'); return; }
    const data = { ...form, GiaTri: Number(form.GiaTri), DieuKien: Number(form.DieuKien) || 0, GiamToiDa: Number(form.GiamToiDa) || 0, SoLuongMa: Number(form.SoLuongMa) || 100 };
    if (modal === 'add') { addVoucher(data); showToast('Thêm voucher thành công!', 'success'); }
    else { updateVoucher(modal.MaVoucher, data); showToast('Cập nhật thành công!', 'success'); }
    setModal(null);
  };

  const confirmDelete = () => { if (deleteModal) { deleteVoucher(deleteModal); showToast('Đã xóa voucher', 'success'); setDeleteModal(null); } };

  return (
    <div className="slide-up">
      <div className="page-header">
        <div><h1 className="page-title" style={{ display:'flex', alignItems:'center', gap:12 }}><Ticket size={28} color="var(--accent)" /> Quản lý Voucher</h1><p className="page-subtitle">{vouchers.length} voucher</p></div>
        <button className="btn btn-primary" onClick={openAdd} style={{ display:'flex', alignItems:'center', gap:8 }}><Plus size={18} /> Thêm voucher</button>
      </div>
      <div className="card" style={{ padding:0 }}>
        <div className="table-container">
          <table className="table">
            <thead><tr><th>Mã</th><th>Loại</th><th>Giá trị</th><th>ĐK tối thiểu</th><th>Đã dùng</th><th>Hạn SD</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              {vouchers.map(v => (
                <tr key={v.MaVoucher}>
                  <td style={{ fontWeight:700, color:'var(--accent-light)' }}>{v.MaVoucher}</td>
                  <td>{v.KieuGiam === 'Percent' ? '% Giảm' : 'Cố định'}</td>
                  <td style={{ fontWeight:600 }}>{v.KieuGiam === 'Percent' ? `${v.GiaTri}%` : formatCurrency(v.GiaTri)}</td>
                  <td>{formatCurrency(v.DieuKien)}</td>
                  <td>{v.DaDung}/{v.SoLuongMa}</td>
                  <td style={{ fontSize:13 }}>{formatDate(v.NgayBD)} - {formatDate(v.NgayKT)}</td>
                  <td><span className={`badge badge-${v.TrangThai === 'Active' ? 'success' : v.TrangThai === 'Expired' ? 'warning' : 'danger'}`}>{v.TrangThai}</span></td>
                  <td><div style={{ display:'flex', gap:6 }}><button className="btn btn-secondary btn-sm" onClick={() => openEdit(v)}><Edit size={16} /></button><button className="btn btn-danger btn-sm" onClick={() => setDeleteModal(v.MaVoucher)}><Trash2 size={16} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>{modal === 'add' ? 'Thêm voucher' : 'Sửa voucher'}</h3><button className="btn btn-icon btn-secondary" onClick={() => setModal(null)}>✕</button></div>
            <div className="modal-body">
              <div className="form-group" style={{marginBottom:16}}><label className="form-label">Mã voucher *</label><input className="input" value={form.MaVoucher||''} onChange={e => setForm({...form, MaVoucher:e.target.value.toUpperCase()})} disabled={modal !== 'add'} /></div>
              <div className="form-row" style={{marginBottom:16}}>
                <div className="form-group"><label className="form-label">Loại giảm</label><select className="select" value={form.KieuGiam||''} onChange={e => setForm({...form, KieuGiam:e.target.value})}><option value="Percent">Phần trăm (%)</option><option value="Fixed">Cố định (VNĐ)</option></select></div>
                <div className="form-group"><label className="form-label">Giá trị *</label><input className="input" type="number" value={form.GiaTri||''} onChange={e => setForm({...form, GiaTri:e.target.value})} /></div>
              </div>
              <div className="form-row" style={{marginBottom:16}}>
                <div className="form-group"><label className="form-label">Đơn tối thiểu</label><input className="input" type="number" value={form.DieuKien||''} onChange={e => setForm({...form, DieuKien:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Giảm tối đa</label><input className="input" type="number" value={form.GiamToiDa||''} onChange={e => setForm({...form, GiamToiDa:e.target.value})} /></div>
              </div>
              <div className="form-row" style={{marginBottom:16}}>
                <div className="form-group"><label className="form-label">Ngày bắt đầu</label><input className="input" type="date" value={form.NgayBD||''} onChange={e => setForm({...form, NgayBD:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Ngày kết thúc</label><input className="input" type="date" value={form.NgayKT||''} onChange={e => setForm({...form, NgayKT:e.target.value})} /></div>
              </div>
              <div className="form-group"><label className="form-label">Số lượng mã</label><input className="input" type="number" value={form.SoLuongMa||''} onChange={e => setForm({...form, SoLuongMa:e.target.value})} /></div>
            </div>
            <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setModal(null)}>Hủy</button><button className="btn btn-primary" onClick={handleSave} style={{ display:'flex', alignItems:'center', gap:6 }}><Save size={18} /> Lưu</button></div>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="modal-overlay" onClick={() => setDeleteModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--danger)' }}>
                <AlertTriangle size={20} /> Xác nhận xóa
              </h3>
              <button className="btn btn-icon btn-secondary" onClick={() => setDeleteModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Bạn có chắc chắn muốn xóa voucher này không? Hành động này không thể hoàn tác.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteModal(null)}>Hủy</button>
              <button className="btn btn-danger" onClick={confirmDelete} style={{ display:'flex', alignItems:'center', gap:6 }}><Trash2 size={18} /> Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
