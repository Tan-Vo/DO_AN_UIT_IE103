import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [voucher, setVoucher] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(items)); }, [items]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.MaSP === product.MaSP);
      if (existing) return prev.map(i => i.MaSP === product.MaSP ? { ...i, SoLuong: i.SoLuong + qty } : i);
      return [...prev, { MaSP: product.MaSP, TenSP: product.TenSP, HinhAnh: product.HinhAnh, GiaBan: product.GiaBan, GiaGoc: product.GiaGoc, SoLuong: qty, SoLuongTon: product.SoLuongTon }];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.MaSP !== id));
  const updateQty = (id, qty) => setItems(prev => prev.map(i => i.MaSP === id ? { ...i, SoLuong: Math.max(1, Math.min(qty, i.SoLuongTon)) } : i));
  const clearCart = () => { setItems([]); setVoucher(null); setDiscount(0); localStorage.removeItem('cart'); };

  const subtotal = items.reduce((s, i) => s + i.GiaBan * i.SoLuong, 0);
  const applyVoucher = (v, disc) => { setVoucher(v); setDiscount(disc); };
  const removeVoucher = () => { setVoucher(null); setDiscount(0); };
  const itemCount = items.reduce((s, i) => s + i.SoLuong, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, subtotal, voucher, discount, applyVoucher, removeVoucher, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
export default CartContext;
