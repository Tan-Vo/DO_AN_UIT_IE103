import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  HelpCircle, Info, BookOpen, User, GraduationCap, 
  ShoppingBag, ClipboardList, 
  Ticket, Users, Package, LayoutDashboard, LineChart, Shield, Calendar
} from 'lucide-react';

export default function Help() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('guide');
  const [guideRole, setGuideRole] = useState(user?.role || 'admin');

  const adminSteps = [
    {
      icon: <LayoutDashboard size={20} color="var(--accent-light)" />,
      title: "1. Quản lý Tổng quan (Dashboard)",
      desc: "Xem biểu đồ phân tích nhanh, tổng số lượng sản phẩm, doanh thu, đơn hàng cần xử lý và số lượng khách hàng. Đây là nơi quản trị viên có cái nhìn toàn cảnh về hoạt động kinh doanh."
    },
    {
      icon: <Package size={20} color="var(--accent-light)" />,
      title: "2. Quản lý Danh mục & Sản phẩm",
      desc: "Thêm mới, sửa thông tin, xóa hoặc thay đổi trạng thái bán của các sản phẩm. Hệ thống sẽ tự động hiển thị cảnh báo nếu số lượng tồn kho của sản phẩm dưới mức an toàn (ít hơn 10 sản phẩm)."
    },
    {
      icon: <Users size={20} color="var(--accent-light)" />,
      title: "3. Quản lý Thông tin Khách hàng",
      desc: "Xem danh sách tài khoản khách hàng đăng ký trên hệ thống, chi tiết lịch sử mua sắm, địa chỉ giao hàng và tổng chi tiêu để phục vụ công tác chăm sóc khách hàng tốt hơn."
    },
    {
      icon: <ClipboardList size={20} color="var(--accent-light)" />,
      title: "4. Xử lý & Phê duyệt Đơn hàng",
      desc: "Theo dõi và cập nhật trạng thái các đơn hàng từ 'Chờ xác nhận', 'Đang xử lý', 'Đang giao' đến 'Hoàn thành' hoặc 'Đã hủy'. Cho phép chỉ định nhân viên xử lý đơn hàng cụ thể."
    },
    {
      icon: <Ticket size={20} color="var(--accent-light)" />,
      title: "5. Quản lý Mã giảm giá (Voucher)",
      desc: "Tạo lập các mã khuyến mãi theo số tiền cố định hoặc theo phần trăm đơn hàng, thiết lập điều kiện hóa đơn tối thiểu, mức giảm tối đa và thời gian hiệu lực của mã."
    },
    {
      icon: <LineChart size={20} color="var(--accent-light)" />,
      title: "6. Xem Báo cáo & Thống kê",
      desc: "Phân tích số liệu trực quan bằng biểu đồ cột, biểu đồ tròn và biểu đồ đường đối với Doanh thu theo tháng, Top sản phẩm bán chạy, Đơn hàng theo trạng thái, và Doanh thu theo phương thức thanh toán."
    }
  ];

  const customerSteps = [
    {
      icon: <ShoppingBag size={20} color="var(--accent-light)" />,
      title: "1. Khám phá & Lựa chọn Sản phẩm",
      desc: "Tại Trang chủ, bạn có thể lọc sản phẩm theo danh mục và tìm kiếm theo tên. Bấm vào sản phẩm bất kỳ để xem mô tả chi tiết, số lượng còn lại trong kho, đánh giá từ người mua khác."
    },
    {
      icon: <ShoppingBag size={20} color="var(--accent-light)" />,
      title: "2. Thêm vào Giỏ hàng & Điều chỉnh",
      desc: "Lựa chọn số lượng sản phẩm mong muốn và bấm 'Thêm vào giỏ'. Trong trang Giỏ hàng, bạn có thể tăng giảm số lượng sản phẩm hoặc loại bỏ các mặt hàng không muốn mua nữa."
    },
    {
      icon: <Ticket size={20} color="var(--accent-light)" />,
      title: "3. Áp dụng Mã giảm giá (Voucher)",
      desc: "Nhập mã giảm giá có sẵn (ví dụ: GIAM20, GIAM50K, FREESHIP) tại màn hình giỏ hàng hoặc thanh toán để được giảm giá trực tiếp vào hóa đơn nếu đạt đủ điều kiện tối thiểu."
    },
    {
      icon: <ClipboardList size={20} color="var(--accent-light)" />,
      title: "4. Điền thông tin giao hàng & Đặt hàng",
      desc: "Chọn Phương thức thanh toán (COD, Momo, Chuyển khoản, Thẻ tín dụng), Đơn vị vận chuyển phù hợp, điền chính xác địa chỉ giao hàng và số điện thoại trước khi bấm đặt hàng."
    },
    {
      icon: <Info size={20} color="var(--accent-light)" />,
      title: "5. Theo dõi lịch sử đơn hàng",
      desc: "Vào mục 'Đơn hàng' để theo dõi tiến trình xử lý đơn hàng của bạn theo thời gian thực (Chờ xác nhận -> Đang xử lý -> Đang giao -> Hoàn thành) hoặc hủy đơn hàng nếu đơn hàng chưa được duyệt."
    },
    {
      icon: <User size={20} color="var(--accent-light)" />,
      title: "6. Cập nhật hồ sơ cá nhân",
      desc: "Truy cập mục Thông tin cá nhân để thay đổi họ tên, số điện thoại, email, địa chỉ giao hàng mặc định và cập nhật lại mật khẩu tài khoản để tăng tính bảo mật."
    }
  ];

  return (
    <div className="help-page slide-up">
      <div className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <HelpCircle size={28} color="var(--accent)" /> Trợ giúp & Giới thiệu
          </h1>
          <p className="page-subtitle">Tài liệu hướng dẫn sử dụng phần mềm và thông tin bản quyền đồ án</p>
        </div>
      </div>

      <div className="help-tabs">
        <button 
          className={`help-tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
          onClick={() => setActiveTab('guide')}
        >
          <BookOpen size={18} /> Hướng dẫn sử dụng
        </button>
        <button 
          className={`help-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <Info size={18} /> Giới thiệu đồ án
        </button>
      </div>

      {activeTab === 'guide' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>Hướng dẫn quy trình nghiệp vụ</h3>
            <div style={{ display: 'flex', gap: 8, background: 'var(--bg-glass)', padding: 4, borderRadius: 'var(--radius-sm)' }}>
              <button 
                className={`btn btn-sm ${guideRole === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ border: 'none' }}
                onClick={() => setGuideRole('admin')}
              >
                Giao diện Admin
              </button>
              <button 
                className={`btn btn-sm ${guideRole === 'customer' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ border: 'none' }}
                onClick={() => setGuideRole('customer')}
              >
                Giao diện Khách hàng
              </button>
            </div>
          </div>

          <div className="guide-section">
            {(guideRole === 'admin' ? adminSteps : customerSteps).map((step, idx) => (
              <div className="guide-step-card" key={idx}>
                <div className="guide-step-num">
                  {idx + 1}
                </div>
                <div className="guide-step-body">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {step.icon}
                    {step.title}
                  </h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="about-card">
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 20, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, background: 'linear-gradient(135deg, #fff, var(--accent-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>
              HỆ THỐNG QUẢN LÝ BÁN HÀNG ONLINE
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              Đồ án thực hành môn Thiết kế Giao diện Người dùng (IE103.O11)
            </p>
          </div>

          <div className="about-grid">
            <div className="about-field">
              <span className="about-label"><GraduationCap size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Giảng viên hướng dẫn</span>
              <span className="about-val" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>TS. Nguyễn Gia Tuấn Anh</span>
            </div>
            <div className="about-field">
              <span className="about-label"><Shield size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Môn học</span>
              <span className="about-val">Thiết kế Giao diện Người dùng (IE103.O11)</span>
            </div>
            <div className="about-field" style={{ gridColumn: '1 / -1' }}>
              <span className="about-label"><User size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Thành viên thực hiện</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
                <div className="about-val" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 6 }}>
                  <span>1. [Họ và tên Sinh viên 1]</span>
                  <span style={{ color: 'var(--text-muted)' }}>MSSV: [MSSV 1]</span>
                </div>
                <div className="about-val" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>2. [Họ và tên Sinh viên 2]</span>
                  <span style={{ color: 'var(--text-muted)' }}>MSSV: [MSSV 2]</span>
                </div>
              </div>
            </div>
            <div className="about-field">
              <span className="about-label"><Calendar size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Phiên bản</span>
              <span className="about-val">v1.0.0 (Official Build)</span>
            </div>
            <div className="about-field">
              <span className="about-label">Cơ sở đào tạo</span>
              <span className="about-val">Đại học Công nghệ Thông tin (UIT)</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 24, paddingTop: 16, fontSize: 13, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>© {new Date().getFullYear()} Nhóm Đồ án IE103. All rights reserved.</span>
            <span style={{ color: 'var(--accent-light)', fontWeight: 500 }}>UIT - IE103</span>
          </div>
        </div>
      )}
    </div>
  );
}
