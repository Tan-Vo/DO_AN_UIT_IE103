import { createContext, useContext, useState, useEffect } from 'react';
import { accounts as initialAccounts } from '../data/accounts';
import { customers as initialCustomers, employees } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accountList, setAccountList] = useState(() => {
    const saved = localStorage.getItem('accountList');
    return saved ? JSON.parse(saved) : [...initialAccounts];
  });
  const [customerList, setCustomerList] = useState(() => {
    const saved = localStorage.getItem('customerList');
    return saved ? JSON.parse(saved) : [...initialCustomers];
  });

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Persist accounts & customers to localStorage
  useEffect(() => {
    localStorage.setItem('accountList', JSON.stringify(accountList));
  }, [accountList]);
  useEffect(() => {
    localStorage.setItem('customerList', JSON.stringify(customerList));
  }, [customerList]);

  const login = (username, password) => {
    const acc = accountList.find(a => a.username === username && a.password === password);
    if (!acc) return { success: false, message: 'Sai tài khoản hoặc mật khẩu' };

    let profile;
    if (acc.role === 'admin') {
      profile = employees.find(e => e.MaNV === acc.id);
    } else {
      profile = customerList.find(c => c.MaKH === acc.id);
      if (profile?.TrangThai === 'Banned') return { success: false, message: 'Tài khoản đã bị khóa' };
    }

    const userData = { ...acc, profile };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true, role: acc.role };
  };

  const register = (form) => {
    // Check duplicate username
    if (accountList.find(a => a.username === form.username)) {
      return { success: false, message: 'Tên đăng nhập đã tồn tại' };
    }
    // Check duplicate email
    if (customerList.find(c => c.Email === form.email)) {
      return { success: false, message: 'Email đã được sử dụng' };
    }

    // Generate new IDs
    const maxId = customerList.reduce((max, c) => {
      const num = parseInt(c.MaKH.replace('KH', ''));
      return num > max ? num : max;
    }, 0);
    const newId = `KH${String(maxId + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    // Create new customer
    const newCustomer = {
      MaKH: newId,
      TenKH: form.name,
      TaiKhoan: form.username,
      MatKhau: form.password,
      DiaChi: form.address || '',
      SoDT: form.phone,
      Email: form.email,
      TrangThai: 'Active',
      NgayDK: today
    };

    // Create new account
    const newAccount = {
      username: form.username,
      password: form.password,
      role: 'customer',
      id: newId
    };

    setAccountList(prev => [...prev, newAccount]);
    setCustomerList(prev => [...prev, newCustomer]);

    return { success: true };
  };

  const findAccountByEmail = (email) => {
    return customerList.find(c => c.Email === email);
  };

  const resetPassword = (email, newPassword) => {
    const customer = customerList.find(c => c.Email === email);
    if (!customer) return false;

    // Update customer password
    setCustomerList(prev => prev.map(c =>
      c.Email === email ? { ...c, MatKhau: newPassword } : c
    ));

    // Update account password
    setAccountList(prev => prev.map(a =>
      a.id === customer.MaKH ? { ...a, password: newPassword } : a
    ));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, findAccountByEmail, resetPassword, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
