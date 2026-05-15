import { createContext, useContext, useState, useEffect } from 'react';
import { accounts } from '../data/accounts';
import { customers, employees } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (username, password) => {
    const acc = accounts.find(a => a.username === username && a.password === password);
    if (!acc) return { success: false, message: 'Sai tài khoản hoặc mật khẩu' };

    let profile;
    if (acc.role === 'admin') {
      profile = employees.find(e => e.MaNV === acc.id);
    } else {
      profile = customers.find(c => c.MaKH === acc.id);
      if (profile?.TrangThai === 'Banned') return { success: false, message: 'Tài khoản đã bị khóa' };
    }

    const userData = { ...acc, profile };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true, role: acc.role };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
