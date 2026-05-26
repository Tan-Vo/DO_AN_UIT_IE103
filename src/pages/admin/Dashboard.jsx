import { useData } from '../../context/DataContext';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/helpers';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { DollarSign, Package, Users, ShoppingBag, TrendingUp, Trophy, ClipboardList, LayoutDashboard } from 'lucide-react';
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
  const { products, customers, orders, orderDetails } = useData();

  const completedOrders = orders.filter(o => o.TrangThai === 'Hoàn thành');
  const totalRevenue = completedOrders.reduce((s, o) => s + o.TongTien, 0);
  const pendingOrders = orders.filter(o => o.TrangThai === 'Chờ xác nhận').length;

  // Revenue by month
  const months = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];
  const revenueByMonth = months.map((_, i) => {
    return orders.filter(o => { const m = new Date(o.NgayDat).getMonth(); return m === i && o.TrangThai !== 'Đã hủy'; }).reduce((s, o) => s + o.TongTien, 0);
  });

  const revenueData = {
    labels: months,
    datasets: [{
      label: 'Doanh thu (VNĐ)',
      data: revenueByMonth,
      borderColor: '#6c5ce7', backgroundColor: 'rgba(108,92,231,0.15)',
      fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#6c5ce7'
    }]
  };

  // Top products
  const productSales = {};
  orderDetails.forEach(od => { productSales[od.MaSP] = (productSales[od.MaSP] || 0) + od.SoLuong; });
  const topProducts = Object.entries(productSales).sort((a,b) => b[1]-a[1]).slice(0, 5).map(([id, qty]) => ({
    name: products.find(p => p.MaSP === id)?.TenSP || id, qty
  }));

  const topData = {
    labels: topProducts.map(p => p.name.length > 20 ? p.name.slice(0,20)+'...' : p.name),
    datasets: [{ label: 'Số lượng bán', data: topProducts.map(p => p.qty), backgroundColor: ['#6c5ce7','#00b894','#fd79a8','#fdcb6e','#74b9ff'], borderRadius: 6 }]
  };

  const chartOpts = {
    responsive: true,
    plugins: { legend: { labels: { color:'#a0a0b8' } } },
    scales: {
      x: {
        ticks: {
          color: '#6b6b80',
          callback: function(value) {
            return this.type === 'linear' ? value.toLocaleString('vi-VN') : this.getLabelForValue(value);
          }
        },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        ticks: {
          color: '#6b6b80',
          callback: function(value) {
            return this.type === 'linear' ? value.toLocaleString('vi-VN') : this.getLabelForValue(value);
          }
        },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    }
  };

  const recentOrders = [...orders].sort((a,b) => new Date(b.NgayDat) - new Date(a.NgayDat)).slice(0, 5);

  return (
    <div className="slide-up">
      <div className="page-header">
        <div><h1 className="page-title" style={{ display:'flex', alignItems:'center', gap:12 }}><LayoutDashboard size={28} color="var(--accent)" /> Dashboard</h1><p className="page-subtitle">Tổng quan hoạt động kinh doanh</p></div>
      </div>

      <div className="stats-grid">
        {[
          { icon:<DollarSign size={24}/>, label:'Tổng doanh thu', value: formatCurrency(totalRevenue), trend:'↑ Từ đơn hoàn thành', color:'#6c5ce7' },
          { icon:<Package size={24}/>, label:'Tổng đơn hàng', value: orders.length, trend:`${pendingOrders} chờ xác nhận`, color:'#00b894' },
          { icon:<Users size={24}/>, label:'Khách hàng', value: customers.length, trend:'Đang hoạt động', color:'#fd79a8' },
          { icon:<ShoppingBag size={24}/>, label:'Sản phẩm', value: products.length, trend:`${products.filter(p=>p.SoLuongTon<5).length} sắp hết hàng`, color:'#fdcb6e' }
        ].map((s, i) => (
          <div className="stat-card" key={i} style={{ borderTop:`3px solid ${s.color}` }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-trend up">{s.trend}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
        <div className="card"><h3 style={{ marginBottom:16, display:'flex', alignItems:'center', gap:8 }}><TrendingUp size={20} /> Doanh thu theo tháng</h3><Line data={revenueData} options={chartOpts} /></div>
        <div className="card"><h3 style={{ marginBottom:16, display:'flex', alignItems:'center', gap:8 }}><Trophy size={20} color="var(--warning)" /> Top sản phẩm bán chạy</h3><Bar data={topData} options={{ ...chartOpts, indexAxis:'y' }} /></div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom:16, display:'flex', alignItems:'center', gap:8 }}><ClipboardList size={20} /> Đơn hàng gần đây</h3>
        <div className="table-container">
          <table className="table">
            <thead><tr><th>Mã ĐH</th><th>Khách hàng</th><th>Ngày</th><th>Tổng tiền</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {recentOrders.map(o => (
                <tr key={o.MaDH}>
                  <td style={{ fontWeight:600 }}>{o.MaDH}</td>
                  <td>{customers.find(c => c.MaKH === o.MaKH)?.TenKH || o.MaKH}</td>
                  <td>{formatDate(o.NgayDat)}</td>
                  <td style={{ fontWeight:600, color:'var(--accent-light)' }}>{formatCurrency(o.TongTien)}</td>
                  <td><span className="badge" style={{ background:`${getStatusColor(o.TrangThai)}20`, color:getStatusColor(o.TrangThai) }}>{o.TrangThai}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
