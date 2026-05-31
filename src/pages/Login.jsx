import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Lock, User, ShoppingCart, Loader2, Mail, Phone, MapPin, ArrowLeft, KeyRound, UserPlus, LogIn, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function Login() {
  // 'login' | 'register' | 'forgot'
  const [view, setView] = useState('login');

  return (
    <div className="login-page">
      <div className="auth-container">
        {view === 'login' && <LoginForm onSwitch={setView} />}
        {view === 'register' && <RegisterForm onSwitch={setView} />}
        {view === 'forgot' && <ForgotPasswordForm onSwitch={setView} />}
      </div>
    </div>
  );
}

/* ===================== LOGIN FORM ===================== */
function LoginForm({ onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
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
    <div className="login-card slide-up">
      <div className="auth-icon-wrap">
        <LogIn size={28} />
      </div>
      <h1 style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
        <ShoppingBag size={32} color="var(--accent)" /> Đồ án 103
      </h1>
      <p>Đăng nhập vào hệ thống quản lý bán hàng</p>

      {error && <div className="auth-error"><span>⚠</span> {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Tài khoản</label>
          <div className="input-icon-wrap">
            <User size={16} className="input-icon-left" />
            <input className="input input-with-icon" placeholder="Nhập tên đăng nhập..." value={username} onChange={e => setUsername(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Mật khẩu</label>
          <div className="input-icon-wrap">
            <Lock size={16} className="input-icon-left" />
            <input className="input input-with-icon" type={showPw ? 'text' : 'password'} placeholder="Nhập mật khẩu..." value={password} onChange={e => setPassword(e.target.value)} />
            <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="auth-links-row">
          <button type="button" className="auth-link" onClick={() => onSwitch('forgot')}>Quên mật khẩu?</button>
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          {loading ? <><Loader2 size={18} className="spin" /> Đang xử lý...</> : <><Lock size={18} /> Đăng nhập</>}
        </button>
      </form>

      <div className="auth-switch">
        Chưa có tài khoản? <button type="button" className="auth-link" onClick={() => onSwitch('register')}><UserPlus size={14} /> Đăng ký ngay</button>
      </div>

      <div className="test-accounts">
        <strong style={{ color:'var(--text-primary)' }}>Tài khoản test:</strong><br/>
        <span style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}><User size={14}/> Admin: admin / admin123</span>
        <span style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}><ShoppingCart size={14}/> KH1: nguyenvana / 123456</span>
        <span style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}><ShoppingCart size={14}/> KH2: tranthib / 123456</span>
        <span style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}><ShoppingCart size={14}/> KH3: levanc / 123456</span>
      </div>
    </div>
  );
}

/* ===================== REGISTER FORM ===================== */
function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({ name: '', username: '', email: '', phone: '', address: '', password: '', confirmPw: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const validate = () => {
    if (!form.name || !form.username || !form.email || !form.phone || !form.password || !form.confirmPw) return 'Vui lòng nhập đầy đủ thông tin';
    if (form.username.length < 4) return 'Tên đăng nhập phải có ít nhất 4 ký tự';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Email không hợp lệ';
    if (!/^0\d{9}$/.test(form.phone)) return 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)';
    if (form.password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
    if (form.password !== form.confirmPw) return 'Xác nhận mật khẩu không khớp';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setTimeout(() => {
      const result = register(form);
      setLoading(false);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message);
      }
    }, 800);
  };

  if (success) {
    return (
      <div className="login-card slide-up">
        <div className="auth-success-icon">
          <CheckCircle2 size={56} />
        </div>
        <h2 style={{ textAlign:'center', marginBottom:8, color:'var(--success)' }}>Đăng ký thành công!</h2>
        <p style={{ textAlign:'center', color:'var(--text-secondary)', marginBottom:24 }}>Tài khoản của bạn đã được tạo. Hãy đăng nhập để bắt đầu mua sắm.</p>
        <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center', gap:8, display:'flex', alignItems:'center' }} onClick={() => onSwitch('login')}>
          <LogIn size={18} /> Đi tới Đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div className="login-card slide-up" style={{ width: 480 }}>
      <button type="button" className="auth-back" onClick={() => onSwitch('login')}>
        <ArrowLeft size={18} /> Quay lại
      </button>
      <div className="auth-icon-wrap register">
        <UserPlus size={28} />
      </div>
      <h1 style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
        <ShoppingBag size={32} color="var(--accent)" /> Đăng ký
      </h1>
      <p>Tạo tài khoản mới để mua sắm</p>

      {error && <div className="auth-error"><span>⚠</span> {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Họ và tên *</label>
            <div className="input-icon-wrap">
              <User size={16} className="input-icon-left" />
              <input className="input input-with-icon" placeholder="Nguyễn Văn A" value={form.name} onChange={e => update('name', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Tên đăng nhập *</label>
            <div className="input-icon-wrap">
              <User size={16} className="input-icon-left" />
              <input className="input input-with-icon" placeholder="nguyenvana" value={form.username} onChange={e => update('username', e.target.value)} />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email *</label>
            <div className="input-icon-wrap">
              <Mail size={16} className="input-icon-left" />
              <input className="input input-with-icon" type="email" placeholder="email@example.com" value={form.email} onChange={e => update('email', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Số điện thoại *</label>
            <div className="input-icon-wrap">
              <Phone size={16} className="input-icon-left" />
              <input className="input input-with-icon" placeholder="0912345678" value={form.phone} onChange={e => update('phone', e.target.value)} />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Địa chỉ</label>
          <div className="input-icon-wrap">
            <MapPin size={16} className="input-icon-left" />
            <input className="input input-with-icon" placeholder="123 Nguyễn Huệ, Q.1, TP.HCM" value={form.address} onChange={e => update('address', e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Mật khẩu *</label>
            <div className="input-icon-wrap">
              <Lock size={16} className="input-icon-left" />
              <input className="input input-with-icon" type={showPw ? 'text' : 'password'} placeholder="Ít nhất 6 ký tự" value={form.password} onChange={e => update('password', e.target.value)} />
              <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Xác nhận mật khẩu *</label>
            <div className="input-icon-wrap">
              <Lock size={16} className="input-icon-left" />
              <input className="input input-with-icon" type={showPw ? 'text' : 'password'} placeholder="Nhập lại mật khẩu" value={form.confirmPw} onChange={e => update('confirmPw', e.target.value)} />
            </div>
          </div>
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          {loading ? <><Loader2 size={18} className="spin" /> Đang xử lý...</> : <><UserPlus size={18} /> Đăng ký</>}
        </button>
      </form>

      <div className="auth-switch">
        Đã có tài khoản? <button type="button" className="auth-link" onClick={() => onSwitch('login')}><LogIn size={14} /> Đăng nhập</button>
      </div>
    </div>
  );
}

/* ===================== FORGOT PASSWORD FORM ===================== */
function ForgotPasswordForm({ onSwitch }) {
  const [step, setStep] = useState(1); // 1: enter email, 2: enter code, 3: new password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { resetPassword, findAccountByEmail } = useAuth();

  const handleSendCode = (e) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Vui lòng nhập email'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Email không hợp lệ'); return; }

    setLoading(true);
    setTimeout(() => {
      const found = findAccountByEmail(email);
      setLoading(false);
      if (!found) {
        setError('Không tìm thấy tài khoản với email này');
        return;
      }
      setStep(2);
    }, 600);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setError('');
    if (!code) { setError('Vui lòng nhập mã xác nhận'); return; }
    setLoading(true);
    // Simulate — accept any 6-digit code
    setTimeout(() => {
      setLoading(false);
      if (code.length === 6) {
        setStep(3);
      } else {
        setError('Mã xác nhận phải có 6 chữ số');
      }
    }, 500);
  };

  const handleResetPw = (e) => {
    e.preventDefault();
    setError('');
    if (!newPw || !confirmPw) { setError('Vui lòng nhập đầy đủ'); return; }
    if (newPw.length < 6) { setError('Mật khẩu mới phải có ít nhất 6 ký tự'); return; }
    if (newPw !== confirmPw) { setError('Xác nhận mật khẩu không khớp'); return; }
    setLoading(true);
    setTimeout(() => {
      resetPassword(email, newPw);
      setLoading(false);
      setSuccess(true);
    }, 600);
  };

  if (success) {
    return (
      <div className="login-card slide-up">
        <div className="auth-success-icon">
          <CheckCircle2 size={56} />
        </div>
        <h2 style={{ textAlign:'center', marginBottom:8, color:'var(--success)' }}>Đổi mật khẩu thành công!</h2>
        <p style={{ textAlign:'center', color:'var(--text-secondary)', marginBottom:24 }}>Mật khẩu đã được cập nhật. Hãy đăng nhập với mật khẩu mới.</p>
        <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center', gap:8, display:'flex', alignItems:'center' }} onClick={() => onSwitch('login')}>
          <LogIn size={18} /> Đi tới Đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div className="login-card slide-up">
      <button type="button" className="auth-back" onClick={() => onSwitch('login')}>
        <ArrowLeft size={18} /> Quay lại
      </button>
      <div className="auth-icon-wrap forgot">
        <KeyRound size={28} />
      </div>
      <h1 style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
        <KeyRound size={28} color="var(--accent)" /> Quên mật khẩu
      </h1>
      <p>{step === 1 ? 'Nhập email để nhận mã xác nhận' : step === 2 ? 'Nhập mã xác nhận đã gửi qua email' : 'Tạo mật khẩu mới cho tài khoản'}</p>

      {/* Progress Steps */}
      <div className="forgot-steps">
        <div className={`forgot-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
          <div className="forgot-step-dot">1</div>
          <span>Email</span>
        </div>
        <div className={`forgot-step-line ${step > 1 ? 'done' : ''}`}></div>
        <div className={`forgot-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>
          <div className="forgot-step-dot">2</div>
          <span>Xác nhận</span>
        </div>
        <div className={`forgot-step-line ${step > 2 ? 'done' : ''}`}></div>
        <div className={`forgot-step ${step >= 3 ? 'active' : ''}`}>
          <div className="forgot-step-dot">3</div>
          <span>Mật khẩu mới</span>
        </div>
      </div>

      {error && <div className="auth-error"><span>⚠</span> {error}</div>}

      {step === 1 && (
        <form onSubmit={handleSendCode}>
          <div className="form-group">
            <label className="form-label">Địa chỉ Email</label>
            <div className="input-icon-wrap">
              <Mail size={16} className="input-icon-left" />
              <input className="input input-with-icon" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            {loading ? <><Loader2 size={18} className="spin" /> Đang gửi...</> : <><Mail size={18} /> Gửi mã xác nhận</>}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyCode}>
          <div className="form-group">
            <label className="form-label">Mã xác nhận (6 chữ số)</label>
            <div className="input-icon-wrap">
              <KeyRound size={16} className="input-icon-left" />
              <input className="input input-with-icon" placeholder="000000" maxLength={6} value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ''))} style={{ letterSpacing: '8px', fontSize: '20px', textAlign:'center' }} />
            </div>
            <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:4 }}>💡 Demo: nhập bất kỳ 6 chữ số nào (VD: 123456)</p>
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            {loading ? <><Loader2 size={18} className="spin" /> Đang xác nhận...</> : <><CheckCircle2 size={18} /> Xác nhận</>}
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPw}>
          <div className="form-group">
            <label className="form-label">Mật khẩu mới</label>
            <div className="input-icon-wrap">
              <Lock size={16} className="input-icon-left" />
              <input className="input input-with-icon" type={showPw ? 'text' : 'password'} placeholder="Ít nhất 6 ký tự" value={newPw} onChange={e => setNewPw(e.target.value)} />
              <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Xác nhận mật khẩu mới</label>
            <div className="input-icon-wrap">
              <Lock size={16} className="input-icon-left" />
              <input className="input input-with-icon" type={showPw ? 'text' : 'password'} placeholder="Nhập lại mật khẩu" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
            </div>
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            {loading ? <><Loader2 size={18} className="spin" /> Đang xử lý...</> : <><Lock size={18} /> Đặt lại mật khẩu</>}
          </button>
        </form>
      )}

      <div className="auth-switch">
        Nhớ mật khẩu rồi? <button type="button" className="auth-link" onClick={() => onSwitch('login')}><LogIn size={14} /> Đăng nhập</button>
      </div>
    </div>
  );
}
