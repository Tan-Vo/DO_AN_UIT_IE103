import { createContext, useContext, useState } from 'react';
import { products as initProducts, customers as initCustomers, orders as initOrders, orderDetails as initOD, vouchers as initVouchers, reviews as initReviews, payments as initPayments, categories, paymentMethods, shippingProviders } from '../data/mockData';
import { generateId } from '../utils/helpers';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [products, setProducts] = useState(initProducts);
  const [customerList, setCustomerList] = useState(initCustomers);
  const [orderList, setOrderList] = useState(initOrders);
  const [odList, setOdList] = useState(initOD);
  const [voucherList, setVoucherList] = useState(initVouchers);
  const [reviewList, setReviewList] = useState(initReviews);
  const [paymentList, setPaymentList] = useState(initPayments);

  // Products CRUD
  const addProduct = (p) => setProducts(prev => [...prev, { ...p, MaSP: generateId('SP') }]);
  const updateProduct = (id, data) => setProducts(prev => prev.map(p => p.MaSP === id ? { ...p, ...data } : p));
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.MaSP !== id));

  // Orders
  const createOrder = (order, items) => {
    const id = generateId('DH');
    setOrderList(prev => [...prev, { ...order, MaDH: id }]);
    setOdList(prev => [...prev, ...items.map(i => ({ ...i, MaDH: id }))]);
    // Update stock
    items.forEach(item => {
      setProducts(prev => prev.map(p => p.MaSP === item.MaSP ? { ...p, SoLuongTon: p.SoLuongTon - item.SoLuong } : p));
    });
    // Create payment record
    setPaymentList(prev => [...prev, { MaTT: generateId('TT'), MaDH: id, SoTien: order.TongTien, NgayTT: order.NgayDat, MaPTTT: order.MaPTTT, TrangThai: order.MaPTTT === 'PTTT001' ? 'Chờ thanh toán' : 'Đã thanh toán' }]);
    return id;
  };

  const updateOrderStatus = (id, status) => {
    setOrderList(prev => prev.map(o => o.MaDH === id ? { ...o, TrangThai: status } : o));
    if (status === 'Hoàn thành') {
      setPaymentList(prev => prev.map(p => p.MaDH === id ? { ...p, TrangThai: 'Đã thanh toán' } : p));
    }
    if (status === 'Đã hủy') {
      // Restore stock
      const items = odList.filter(od => od.MaDH === id);
      items.forEach(item => {
        setProducts(prev => prev.map(p => p.MaSP === item.MaSP ? { ...p, SoLuongTon: p.SoLuongTon + item.SoLuong } : p));
      });
    }
  };

  // Customers
  const updateCustomerStatus = (id, status) => setCustomerList(prev => prev.map(c => c.MaKH === id ? { ...c, TrangThai: status } : c));

  // Vouchers
  const addVoucher = (v) => setVoucherList(prev => [...prev, v]);
  const updateVoucher = (code, data) => setVoucherList(prev => prev.map(v => v.MaVoucher === code ? { ...v, ...data } : v));
  const deleteVoucher = (code) => setVoucherList(prev => prev.filter(v => v.MaVoucher !== code));
  const validateVoucher = (code, total) => {
    const v = voucherList.find(v => v.MaVoucher === code);
    if (!v) return { valid: false, msg: 'Mã không tồn tại' };
    if (v.TrangThai !== 'Active') return { valid: false, msg: 'Mã đã hết hạn' };
    if (total < v.DieuKien) return { valid: false, msg: `Đơn tối thiểu ${v.DieuKien.toLocaleString()}đ` };
    if (v.DaDung >= v.SoLuongMa) return { valid: false, msg: 'Mã đã hết lượt' };
    let discount = v.KieuGiam === 'Percent' ? Math.min(total * v.GiaTri / 100, v.GiamToiDa) : v.GiaTri;
    return { valid: true, discount, voucher: v };
  };

  // Reviews
  const addReview = (r) => setReviewList(prev => [...prev, { ...r, MaDG: generateId('DG'), NgayDG: new Date().toISOString().split('T')[0] }]);

  const value = {
    products, categories, paymentMethods, shippingProviders,
    customers: customerList, orders: orderList, orderDetails: odList,
    vouchers: voucherList, reviews: reviewList, payments: paymentList,
    addProduct, updateProduct, deleteProduct,
    createOrder, updateOrderStatus,
    updateCustomerStatus,
    addVoucher, updateVoucher, deleteVoucher, validateVoucher,
    addReview
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);
export default DataContext;
