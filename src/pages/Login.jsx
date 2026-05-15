import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Lock, User, ShoppingCart, Loader2 } from 'lucide-react';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) { setError('Vui lòng nhập đầy đủ thông tin'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = login(username, password);
      setLoading(false);
      if (result.success) {
        navigate(result.role === 'admin' ? '/admin' : '/');
      } else {
        setError(result.message);
      }
    }, 500);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}><ShoppingBag size={32} color="var(--accent)" /> Đồ án 103</h1>
        <p>Đăng nhập vào hệ thống quản lý bán hàng</p>
        {error && <div style={{ background:'rgba(231,76,60,0.15)', color:'#e74c3c', padding:'10px 14px', borderRadius:8, marginBottom:16, fontSize:14 }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Tài khoản</label>
            <input className="input" placeholder="Nhập tên đăng nhập..." value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <input className="input" type="password" placeholder="Nhập mật khẩu..." value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            {loading ? <><Loader2 size={18} className="spin" /> Đang xử lý...</> : <><Lock size={18} /> Đăng nhập</>}
          </button>
        </form>
        <div style={{ marginTop:24, padding:16, background:'var(--bg-glass)', borderRadius:8, fontSize:13, color:'var(--text-secondary)' }}>
          <strong style={{ color:'var(--text-primary)' }}>Tài khoản test:</strong><br/>
          <span style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}><User size={14}/> Admin: admin / admin123</span>
          <span style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}><ShoppingCart size={14}/> KH1: nguyenvana / 123456</span>
          <span style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}><ShoppingCart size={14}/> KH2: tranthib / 123456</span>
          <span style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}><ShoppingCart size={14}/> KH3: levanc / 123456</span>
        </div>
      </div>
    </div>
  );
}
