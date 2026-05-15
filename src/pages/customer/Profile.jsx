import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { User, Lock, MapPin, Save, Key, Lightbulb, FileText } from 'lucide-react';


export default function Profile() {
  const { user } = useAuth();
  const { showToast } = useNotification();
  const p = user?.profile;
  const [tab, setTab] = useState('info');
  const [form, setForm] = useState({ TenKH: p?.TenKH||'', SoDT: p?.SoDT||'', Email: p?.Email||'', DiaChi: p?.DiaChi||'' });
  const [pwForm, setPwForm] = useState({ old:'', new1:'', new2:'' });

  const handleSaveInfo = () => { showToast('Cập nhật thông tin thành công!', 'success'); };
  const handleChangePw = () => {
    if (pwForm.old !== user.password) { showToast('Mật khẩu cũ không đúng', 'error'); return; }
    if (pwForm.new1.length < 6) { showToast('Mật khẩu mới tối thiểu 6 ký tự', 'error'); return; }
    if (pwForm.new1 !== pwForm.new2) { showToast('Mật khẩu xác nhận không khớp', 'error'); return; }
    showToast('Đổi mật khẩu thành công!', 'success');
    setPwForm({ old:'', new1:'', new2:'' });
  };

  const tabs = [
    { key:'info', icon:<User size={18} />, label:'Thông tin' },
    { key:'password', icon:<Lock size={18} />, label:'Đổi mật khẩu' },
    { key:'addresses', icon:<MapPin size={18} />, label:'Địa chỉ' }
  ];

  return (
    <div className="slide-up">
      <h1 className="page-title" style={{ marginBottom:24, display:'flex', alignItems:'center', gap:12 }}><User size={32} color="var(--accent)" /> Tài khoản của tôi</h1>
      <div className="profile-layout">
        <div className="card" style={{ padding:16, height:'fit-content' }}>
          <div style={{ textAlign:'center', padding:'16px 0', marginBottom:16, borderBottom:'1px solid var(--border)' }}>
            <div style={{ marginBottom:12 }}><User size={64} color="var(--accent-light)" /></div>
            <div style={{ fontWeight:700 }}>{p?.TenKH}</div>
            <div style={{ fontSize:13, color:'var(--text-muted)' }}>{p?.Email}</div>
          </div>
          <div className="profile-menu">
            {tabs.map(t => (
              <div key={t.key} className={`profile-menu-item ${tab===t.key?'active':''}`} onClick={() => setTab(t.key)} style={{ display:'flex', alignItems:'center', gap:10 }}>
                {t.icon} {t.label}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          {tab === 'info' && (
            <>
              <h3 style={{ marginBottom:20, display:'flex', alignItems:'center', gap:8 }}><FileText size={20} /> Thông tin cá nhân</h3>
              <div className="form-row" style={{marginBottom:16}}>
                <div className="form-group"><label className="form-label">Họ tên</label><input className="input" value={form.TenKH} onChange={e => setForm({...form, TenKH:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Số điện thoại</label><input className="input" value={form.SoDT} onChange={e => setForm({...form, SoDT:e.target.value})} /></div>
              </div>
              <div className="form-group" style={{marginBottom:16}}><label className="form-label">Email</label><input className="input" value={form.Email} onChange={e => setForm({...form, Email:e.target.value})} /></div>
              <div className="form-group" style={{marginBottom:16}}><label className="form-label">Địa chỉ</label><textarea className="textarea" value={form.DiaChi} onChange={e => setForm({...form, DiaChi:e.target.value})} /></div>
              <button className="btn btn-primary" onClick={handleSaveInfo} style={{ display:'flex', alignItems:'center', gap:8 }}><Save size={18} /> Lưu thay đổi</button>
            </>
          )}

          {tab === 'password' && (
            <>
              <h3 style={{ marginBottom:20, display:'flex', alignItems:'center', gap:8 }}><Lock size={20} /> Đổi mật khẩu</h3>
              <div className="form-group" style={{marginBottom:16}}><label className="form-label">Mật khẩu hiện tại</label><input className="input" type="password" value={pwForm.old} onChange={e => setPwForm({...pwForm, old:e.target.value})} /></div>
              <div className="form-group" style={{marginBottom:16}}><label className="form-label">Mật khẩu mới</label><input className="input" type="password" value={pwForm.new1} onChange={e => setPwForm({...pwForm, new1:e.target.value})} /></div>
              <div className="form-group" style={{marginBottom:16}}><label className="form-label">Xác nhận mật khẩu mới</label><input className="input" type="password" value={pwForm.new2} onChange={e => setPwForm({...pwForm, new2:e.target.value})} /></div>
              <button className="btn btn-primary" onClick={handleChangePw} style={{ display:'flex', alignItems:'center', gap:8 }}><Key size={18} /> Đổi mật khẩu</button>
            </>
          )}

          {tab === 'addresses' && (
            <>
              <h3 style={{ marginBottom:20, display:'flex', alignItems:'center', gap:8 }}><MapPin size={20} /> Địa chỉ đã lưu</h3>
              <div className="card-glass" style={{ padding:16, marginBottom:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontWeight:600 }}>{p?.TenKH} <span className="badge badge-success" style={{ marginLeft:8 }}>Mặc định</span></div>
                    <div style={{ fontSize:13, color:'var(--text-secondary)', marginTop:4 }}>{p?.SoDT}</div>
                    <div style={{ fontSize:13, color:'var(--text-secondary)' }}>{p?.DiaChi}</div>
                  </div>
                </div>
              </div>
              <p style={{ color:'var(--text-muted)', fontSize:13, display:'flex', alignItems:'center', gap:6 }}><Lightbulb size={16} /> Tính năng quản lý nhiều địa chỉ sẽ được cập nhật trong phiên bản sau</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
