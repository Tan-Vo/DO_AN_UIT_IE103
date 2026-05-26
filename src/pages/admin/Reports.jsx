import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/helpers';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { LineChart, DollarSign, Package, Users, CreditCard, CheckCircle, XCircle, BarChart3, AlertTriangle } from 'lucide-react';
ChartJS.register(ArcElement);

export default function Reports() {
  const { orders, orderDetails, products, customers, categories, paymentMethods, shippingProviders } = useData();
  const [tab, setTab] = useState('revenue');

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
  const pieOpts = { responsive: true, plugins: { legend: { position:'bottom', labels: { color:'#a0a0b8' } } } };
  const colors = ['#6c5ce7','#00b894','#fd79a8','#fdcb6e','#74b9ff','#e17055'];

  // Revenue by month
  const months = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];
  const revByMonth = months.map((_, i) => orders.filter(o => new Date(o.NgayDat).getMonth() === i && o.TrangThai !== 'Đã hủy').reduce((s,o) => s+o.TongTien, 0));

  // Product sales
  const pSales = {};
  orderDetails.forEach(od => { pSales[od.MaSP] = (pSales[od.MaSP]||0) + od.SoLuong; });
  const topP = Object.entries(pSales).sort((a,b) => b[1]-a[1]).slice(0,10);

  // Category sales
  const catSales = {};
  orderDetails.forEach(od => {
    const p = products.find(p => p.MaSP === od.MaSP);
    if (p) catSales[p.MaDM] = (catSales[p.MaDM]||0) + od.DonGia * od.SoLuong;
  });

  // Payment method breakdown
  const pmSales = {};
  orders.filter(o => o.TrangThai !== 'Đã hủy').forEach(o => { const name = paymentMethods.find(p=>p.MaPTTT===o.MaPTTT)?.TenPTTT||'Khác'; pmSales[name] = (pmSales[name]||0) + o.TongTien; });

  const tabs = [
    { key:'revenue', label:<span style={{ display:'flex', alignItems:'center', gap:6 }}><DollarSign size={16}/> Doanh thu</span> },
    { key:'product', label:<span style={{ display:'flex', alignItems:'center', gap:6 }}><Package size={16}/> Sản phẩm</span> },
    { key:'customer', label:<span style={{ display:'flex', alignItems:'center', gap:6 }}><Users size={16}/> Khách hàng</span> },
    { key:'payment', label:<span style={{ display:'flex', alignItems:'center', gap:6 }}><CreditCard size={16}/> Thanh toán</span> }
  ];

  return (
    <div className="slide-up">
      <div className="page-header"><div><h1 className="page-title" style={{ display:'flex', alignItems:'center', gap:12 }}><LineChart size={28} color="var(--accent)"/> Báo cáo & Thống kê</h1></div></div>
      <div style={{ display:'flex', gap:8, marginBottom:24 }}>
        {tabs.map(t => <button key={t.key} className={`btn ${tab===t.key?'btn-primary':'btn-secondary'}`} onClick={() => setTab(t.key)}>{t.label}</button>)}
      </div>

      {tab === 'revenue' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:20 }}>
          <div className="stats-grid">
            <div className="stat-card" style={{ borderTop:'3px solid #6c5ce7' }}><div className="stat-icon"><DollarSign size={24}/></div><div className="stat-value">{formatCurrency(orders.filter(o=>o.TrangThai!=='Đã hủy').reduce((s,o)=>s+o.TongTien,0))}</div><div className="stat-label">Tổng doanh thu</div></div>
            <div className="stat-card" style={{ borderTop:'3px solid #00b894' }}><div className="stat-icon"><CheckCircle size={24}/></div><div className="stat-value">{orders.filter(o=>o.TrangThai==='Hoàn thành').length}</div><div className="stat-label">Đơn hoàn thành</div></div>
            <div className="stat-card" style={{ borderTop:'3px solid #e74c3c' }}><div className="stat-icon"><XCircle size={24}/></div><div className="stat-value">{orders.filter(o=>o.TrangThai==='Đã hủy').length}</div><div className="stat-label">Đơn đã hủy</div></div>
            <div className="stat-card" style={{ borderTop:'3px solid #fdcb6e' }}><div className="stat-icon"><BarChart3 size={24}/></div><div className="stat-value">{formatCurrency(orders.filter(o=>o.TrangThai!=='Đã hủy').length>0 ? orders.filter(o=>o.TrangThai!=='Đã hủy').reduce((s,o)=>s+o.TongTien,0)/orders.filter(o=>o.TrangThai!=='Đã hủy').length : 0)}</div><div className="stat-label">Giá trị TB/đơn</div></div>
          </div>
          <div className="card"><h3 style={{ marginBottom:16 }}>Doanh thu theo tháng</h3><Line data={{ labels: months, datasets: [{ label:'Doanh thu', data: revByMonth, borderColor:'#6c5ce7', backgroundColor:'rgba(108,92,231,0.1)', fill:true, tension:0.4 }] }} options={chartOpts} /></div>
        </div>
      )}

      {tab === 'product' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          <div className="card"><h3 style={{ marginBottom:16 }}>Top sản phẩm bán chạy</h3><Bar data={{ labels: topP.map(([id]) => { const n = products.find(p=>p.MaSP===id)?.TenSP||id; return n.length>15?n.slice(0,15)+'...':n; }), datasets: [{ label:'SL bán', data: topP.map(([,q])=>q), backgroundColor: colors, borderRadius:6 }] }} options={{ ...chartOpts, indexAxis:'y' }} /></div>
          <div className="card"><h3 style={{ marginBottom:16 }}>Doanh thu theo danh mục</h3><Doughnut data={{ labels: Object.keys(catSales).map(id => categories.find(c=>c.MaDM===id)?.TenDM||id), datasets: [{ data: Object.values(catSales), backgroundColor: colors }] }} options={pieOpts} /></div>
          <div className="card" style={{ gridColumn:'1/-1' }}>
            <h3 style={{ marginBottom:16, display:'flex', alignItems:'center', gap:8 }}><AlertTriangle size={20} color="var(--warning)"/> Sản phẩm sắp hết hàng</h3>
            <div className="table-container"><table className="table"><thead><tr><th>Sản phẩm</th><th>Tồn kho</th><th>Trạng thái</th></tr></thead><tbody>
              {products.filter(p=>p.SoLuongTon<10).sort((a,b)=>a.SoLuongTon-b.SoLuongTon).map(p => <tr key={p.MaSP}><td style={{ display:'flex', alignItems:'center', gap:8 }}><img src={p.HinhAnh} alt={p.TenSP} style={{ width:32, height:32, objectFit:'cover', borderRadius:4 }} /> {p.TenSP}</td><td style={{ fontWeight:700, color: p.SoLuongTon<5?'var(--danger)':'var(--warning)' }}>{p.SoLuongTon}</td><td><span className={`badge ${p.SoLuongTon<5?'badge-danger':'badge-warning'}`}>{p.SoLuongTon<5?'Cần nhập gấp':'Sắp hết'}</span></td></tr>)}
            </tbody></table></div>
          </div>
        </div>
      )}

      {tab === 'customer' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          <div className="card"><h3 style={{ marginBottom:16 }}>Top khách hàng chi tiêu</h3>
            <div className="table-container"><table className="table"><thead><tr><th>Khách hàng</th><th>Số đơn</th><th>Tổng chi tiêu</th></tr></thead><tbody>
              {customers.map(c => ({ ...c, total: orders.filter(o=>o.MaKH===c.MaKH&&o.TrangThai==='Hoàn thành').reduce((s,o)=>s+o.TongTien,0), count: orders.filter(o=>o.MaKH===c.MaKH).length })).sort((a,b)=>b.total-a.total).map(c => <tr key={c.MaKH}><td>{c.TenKH}</td><td>{c.count}</td><td style={{ fontWeight:600, color:'var(--accent-light)' }}>{formatCurrency(c.total)}</td></tr>)}
            </tbody></table></div>
          </div>
          <div className="card"><h3 style={{ marginBottom:16 }}>Đơn hàng theo trạng thái</h3>
            <Doughnut data={{ labels:['Hoàn thành','Đang giao','Đang xử lý','Chờ xác nhận','Đã hủy'], datasets:[{ data:['Hoàn thành','Đang giao','Đang xử lý','Chờ xác nhận','Đã hủy'].map(s=>orders.filter(o=>o.TrangThai===s).length), backgroundColor:['#00b894','#8b5cf6','#3b82f6','#f59e0b','#e74c3c'] }] }} options={pieOpts} />
          </div>
        </div>
      )}

      {tab === 'payment' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          <div className="card"><h3 style={{ marginBottom:16 }}>Doanh thu theo phương thức thanh toán</h3>
            <Doughnut data={{ labels: Object.keys(pmSales), datasets:[{ data: Object.values(pmSales), backgroundColor: colors }] }} options={pieOpts} />
          </div>
          <div className="card"><h3 style={{ marginBottom:16 }}>Đơn theo đơn vị vận chuyển</h3>
            <Bar data={{ labels: shippingProviders.map(s=>s.TenDVVC.split('(')[0].trim()), datasets:[{ label:'Số đơn', data: shippingProviders.map(s=>orders.filter(o=>o.MaDVVC===s.MaDVVC).length), backgroundColor: colors, borderRadius:6 }] }} options={chartOpts} />
          </div>
        </div>
      )}
    </div>
  );
}
