export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('vi-VN', { day:'2-digit', month:'2-digit', year:'numeric' });
};

export const generateId = (prefix) => {
  return prefix + String(Date.now()).slice(-6);
};

export const getStatusColor = (status) => {
  const map = {
    'Chờ xác nhận': '#f59e0b',
    'Đang xử lý': '#3b82f6',
    'Đang giao': '#8b5cf6',
    'Hoàn thành': '#10b981',
    'Đã hủy': '#ef4444',
    'Active': '#10b981',
    'Banned': '#ef4444',
    'Expired': '#6b7280',
    'Disabled': '#6b7280'
  };
  return map[status] || '#6b7280';
};

export const truncate = (str, n = 50) => str?.length > n ? str.slice(0, n) + '...' : str;

export const calcDiscount = (original, sale) => Math.round(((original - sale) / original) * 100);
