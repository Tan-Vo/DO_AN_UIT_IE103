export const customers = [
  { MaKH:'KH001', TenKH:'Nguyễn Văn A', TaiKhoan:'nguyenvana', MatKhau:'123456', DiaChi:'123 Lý Thường Kiệt, Q.10, TP.HCM', SoDT:'0912345678', Email:'nguyenvana@gmail.com', TrangThai:'Active', NgayDK:'2024-01-10' },
  { MaKH:'KH002', TenKH:'Trần Thị B', TaiKhoan:'tranthib', MatKhau:'123456', DiaChi:'456 Nguyễn Trãi, Q.5, TP.HCM', SoDT:'0923456789', Email:'tranthib@gmail.com', TrangThai:'Active', NgayDK:'2024-02-15' },
  { MaKH:'KH003', TenKH:'Lê Văn C', TaiKhoan:'levanc', MatKhau:'123456', DiaChi:'789 Điện Biên Phủ, Q.3, TP.HCM', SoDT:'0934567890', Email:'levanc@gmail.com', TrangThai:'Active', NgayDK:'2024-03-20' }
];

export const employees = [
  { MaNV:'NV001', TenNV:'Admin', TaiKhoan:'admin', MatKhau:'admin123', NgaySinh:'1990-01-01', GioiTinh:'Nam', SoDT:'0987654321', MaCH:'CH001', ChucVu:'Admin' },
  { MaNV:'NV002', TenNV:'Phạm Thị D', TaiKhoan:'phamthid', MatKhau:'123456', NgaySinh:'1995-06-15', GioiTinh:'Nữ', SoDT:'0976543210', MaCH:'CH001', ChucVu:'Staff' }
];

export const store = { MaCH:'CH001', TenCH:'Đồ án 103 Vietnam', DiaChi:'100 Nguyễn Huệ, Q.1, TP.HCM', SoDT:'02838001234', GioMoCua:'08:00', GioDongCua:'22:00', TrangThai:'Mở cửa' };

export const categories = [
  { MaDM:'DM001', TenDM:'Điện thoại', Slug:'dien-thoai' },
  { MaDM:'DM002', TenDM:'Laptop', Slug:'laptop' },
  { MaDM:'DM003', TenDM:'Thời trang Nam', Slug:'thoi-trang-nam' },
  { MaDM:'DM004', TenDM:'Thời trang Nữ', Slug:'thoi-trang-nu' },
  { MaDM:'DM005', TenDM:'Phụ kiện', Slug:'phu-kien' },
  { MaDM:'DM006', TenDM:'Đồ gia dụng', Slug:'gia-dung' }
];

export const products = [
  { MaSP:'SP001', TenSP:'Samsung Galaxy S24 Ultra', HinhAnh:'/images/products/phone.png', MoTa:'Flagship Samsung mới nhất với camera 200MP, chip Snapdragon 8 Gen 3', GiaBan:25990000, GiaGoc:29990000, SoLuongTon:30, MaDM:'DM001', TrangThai:'Active', DanhGiaTB:4.8 },
  { MaSP:'SP002', TenSP:'iPhone 15 Pro Max', HinhAnh:'/images/products/iphone.png', MoTa:'iPhone cao cấp nhất với chip A17 Pro, camera 48MP', GiaBan:29990000, GiaGoc:34990000, SoLuongTon:25, MaDM:'DM001', TrangThai:'Active', DanhGiaTB:4.9 },
  { MaSP:'SP003', TenSP:'Xiaomi 14', HinhAnh:'/images/products/xiaomi.png', MoTa:'Flagship giá tốt với camera Leica, Snapdragon 8 Gen 3', GiaBan:12990000, GiaGoc:14990000, SoLuongTon:50, MaDM:'DM001', TrangThai:'Active', DanhGiaTB:4.5 },
  { MaSP:'SP004', TenSP:'MacBook Air M3', HinhAnh:'/images/products/macbook.png', MoTa:'Laptop mỏng nhẹ Apple với chip M3, pin 18 giờ', GiaBan:27990000, GiaGoc:29990000, SoLuongTon:15, MaDM:'DM002', TrangThai:'Active', DanhGiaTB:4.7 },
  { MaSP:'SP005', TenSP:'Asus ROG Strix G16', HinhAnh:'/images/products/gaming_laptop.png', MoTa:'Laptop gaming với RTX 4060, i7-13650HX', GiaBan:32990000, GiaGoc:35990000, SoLuongTon:10, MaDM:'DM002', TrangThai:'Active', DanhGiaTB:4.6 },
  { MaSP:'SP006', TenSP:'Áo Polo Nam Classic', HinhAnh:'/images/products/polo.png', MoTa:'Áo polo nam chất liệu cotton 100%, form regular fit', GiaBan:299000, GiaGoc:450000, SoLuongTon:100, MaDM:'DM003', TrangThai:'Active', DanhGiaTB:4.3 },
  { MaSP:'SP007', TenSP:'Quần Jean Nam Slim Fit', HinhAnh:'/images/products/jeans.png', MoTa:'Quần jean nam co giãn, wash nhẹ, form slim fit', GiaBan:450000, GiaGoc:650000, SoLuongTon:80, MaDM:'DM003', TrangThai:'Active', DanhGiaTB:4.4 },
  { MaSP:'SP008', TenSP:'Đầm Maxi Hoa Nữ', HinhAnh:'/images/products/dress.png', MoTa:'Đầm maxi họa tiết hoa nhí, chất voan mềm mại', GiaBan:520000, GiaGoc:750000, SoLuongTon:60, MaDM:'DM004', TrangThai:'Active', DanhGiaTB:4.6 },
  { MaSP:'SP009', TenSP:'Áo Sơ Mi Nữ Công Sở', HinhAnh:'/images/products/blouse.png', MoTa:'Áo sơ mi nữ lụa cao cấp, phù hợp công sở', GiaBan:380000, GiaGoc:550000, SoLuongTon:70, MaDM:'DM004', TrangThai:'Active', DanhGiaTB:4.5 },
  { MaSP:'SP010', TenSP:'Tai nghe AirPods Pro 2', HinhAnh:'/images/products/airpods.png', MoTa:'Tai nghe không dây Apple chống ồn chủ động', GiaBan:5490000, GiaGoc:6990000, SoLuongTon:40, MaDM:'DM005', TrangThai:'Active', DanhGiaTB:4.8 },
  { MaSP:'SP011', TenSP:'Balo Laptop Chống Nước', HinhAnh:'/images/products/backpack.png', MoTa:'Balo đựng laptop 15.6 inch chống nước, nhiều ngăn', GiaBan:350000, GiaGoc:500000, SoLuongTon:90, MaDM:'DM005', TrangThai:'Active', DanhGiaTB:4.2 },
  { MaSP:'SP012', TenSP:'Nồi chiên không dầu 5L', HinhAnh:'/images/products/airfryer.png', MoTa:'Air fryer 5 lít đa năng, màn hình cảm ứng', GiaBan:1290000, GiaGoc:1890000, SoLuongTon:35, MaDM:'DM006', TrangThai:'Active', DanhGiaTB:4.4 },
  { MaSP:'SP013', TenSP:'Robot hút bụi thông minh', HinhAnh:'/images/products/robot_vacuum.png', MoTa:'Robot hút bụi lau nhà tự động, điều khiển qua app', GiaBan:4990000, GiaGoc:6990000, SoLuongTon:20, MaDM:'DM006', TrangThai:'Active', DanhGiaTB:4.3 },
  { MaSP:'SP014', TenSP:'Đồng hồ Apple Watch S9', HinhAnh:'/images/products/watch.png', MoTa:'Smartwatch Apple thế hệ mới nhất, GPS + Cellular', GiaBan:9990000, GiaGoc:11990000, SoLuongTon:3, MaDM:'DM005', TrangThai:'Active', DanhGiaTB:4.7 },
  { MaSP:'SP015', TenSP:'Loa Bluetooth JBL Charge 5', HinhAnh:'/images/products/speaker.png', MoTa:'Loa di động chống nước IP67, pin 20 giờ', GiaBan:2790000, GiaGoc:3490000, SoLuongTon:45, MaDM:'DM005', TrangThai:'Active', DanhGiaTB:4.5 }
];

export const paymentMethods = [
  { MaPTTT:'PTTT001', TenPTTT:'Thanh toán khi nhận hàng (COD)' },
  { MaPTTT:'PTTT002', TenPTTT:'Chuyển khoản ngân hàng' },
  { MaPTTT:'PTTT003', TenPTTT:'Ví MoMo' },
  { MaPTTT:'PTTT004', TenPTTT:'Thẻ tín dụng/ghi nợ' }
];

export const shippingProviders = [
  { MaDVVC:'DVVC001', TenDVVC:'Giao Hàng Nhanh (GHN)', Hotline:'1900636677', Email:'support@ghn.vn', PhiVC:32000, TGDuKien:'1-2 ngày' },
  { MaDVVC:'DVVC002', TenDVVC:'SPX Express', Hotline:'1900636898', Email:'support@spx.vn', PhiVC:25000, TGDuKien:'2-3 ngày' },
  { MaDVVC:'DVVC003', TenDVVC:'J&T Express', Hotline:'1900166868', Email:'support@jtexpress.vn', PhiVC:28000, TGDuKien:'2-4 ngày' }
];

export const vouchers = [
  { MaVoucher:'GIAM20', GiaTri:20, KieuGiam:'Percent', DieuKien:500000, GiamToiDa:200000, NgayBD:'2024-01-01', NgayKT:'2025-12-31', SoLuongMa:100, DaDung:45, TrangThai:'Active' },
  { MaVoucher:'GIAM50K', GiaTri:50000, KieuGiam:'Fixed', DieuKien:300000, GiamToiDa:50000, NgayBD:'2024-01-01', NgayKT:'2025-12-31', SoLuongMa:200, DaDung:120, TrangThai:'Active' },
  { MaVoucher:'FREESHIP', GiaTri:30000, KieuGiam:'Fixed', DieuKien:200000, GiamToiDa:30000, NgayBD:'2024-06-01', NgayKT:'2025-12-31', SoLuongMa:500, DaDung:300, TrangThai:'Active' },
  { MaVoucher:'SALE30', GiaTri:30, KieuGiam:'Percent', DieuKien:1000000, GiamToiDa:500000, NgayBD:'2024-01-01', NgayKT:'2024-06-30', SoLuongMa:50, DaDung:50, TrangThai:'Expired' }
];

export const orders = [
  { MaDH:'DH001', NgayDat:'2024-12-01', MaKH:'KH001', MaNV:'NV001', MaDVVC:'DVVC001', MaPTTT:'PTTT001', MaVoucher:'GIAM20', TongTien:22392000, PhiVC:32000, DiaChiGiao:'123 Lý Thường Kiệt, Q.10, TP.HCM', TrangThai:'Hoàn thành' },
  { MaDH:'DH002', NgayDat:'2024-12-15', MaKH:'KH002', MaNV:'NV002', MaDVVC:'DVVC002', MaPTTT:'PTTT003', MaVoucher:null, TongTien:6015000, PhiVC:25000, DiaChiGiao:'456 Nguyễn Trãi, Q.5, TP.HCM', TrangThai:'Hoàn thành' },
  { MaDH:'DH003', NgayDat:'2025-01-10', MaKH:'KH003', MaNV:'NV001', MaDVVC:'DVVC001', MaPTTT:'PTTT002', MaVoucher:'GIAM50K', TongTien:28272000, PhiVC:32000, DiaChiGiao:'789 Điện Biên Phủ, Q.3, TP.HCM', TrangThai:'Hoàn thành' },
  { MaDH:'DH004', NgayDat:'2025-02-20', MaKH:'KH001', MaNV:null, MaDVVC:'DVVC003', MaPTTT:'PTTT001', MaVoucher:null, TongTien:1618000, PhiVC:28000, DiaChiGiao:'123 Lý Thường Kiệt, Q.10, TP.HCM', TrangThai:'Hoàn thành' },
  { MaDH:'DH005', NgayDat:'2025-03-05', MaKH:'KH002', MaNV:'NV001', MaDVVC:'DVVC001', MaPTTT:'PTTT004', MaVoucher:'FREESHIP', TongTien:33260000, PhiVC:0, DiaChiGiao:'456 Nguyễn Trãi, Q.5, TP.HCM', TrangThai:'Đang giao' },
  { MaDH:'DH006', NgayDat:'2025-04-10', MaKH:'KH003', MaNV:'NV002', MaDVVC:'DVVC002', MaPTTT:'PTTT002', MaVoucher:null, TongTien:5840000, PhiVC:25000, DiaChiGiao:'789 Điện Biên Phủ, Q.3, TP.HCM', TrangThai:'Đang xử lý' },
  { MaDH:'DH007', NgayDat:'2025-05-01', MaKH:'KH001', MaNV:null, MaDVVC:'DVVC001', MaPTTT:'PTTT003', MaVoucher:'GIAM20', TongTien:8224000, PhiVC:32000, DiaChiGiao:'123 Lý Thường Kiệt, Q.10, TP.HCM', TrangThai:'Chờ xác nhận' },
  { MaDH:'DH008', NgayDat:'2025-05-12', MaKH:'KH002', MaNV:null, MaDVVC:'DVVC003', MaPTTT:'PTTT001', MaVoucher:null, TongTien:778000, PhiVC:28000, DiaChiGiao:'456 Nguyễn Trãi, Q.5, TP.HCM', TrangThai:'Chờ xác nhận' }
];

export const orderDetails = [
  { MaDH:'DH001', MaSP:'SP001', SoLuong:1, DonGia:25990000 },
  { MaDH:'DH001', MaSP:'SP010', SoLuong:1, DonGia:5490000 },
  { MaDH:'DH002', MaSP:'SP010', SoLuong:1, DonGia:5490000 },
  { MaDH:'DH002', MaSP:'SP006', SoLuong:1, DonGia:299000 },
  { MaDH:'DH003', MaSP:'SP004', SoLuong:1, DonGia:27990000 },
  { MaDH:'DH003', MaSP:'SP011', SoLuong:1, DonGia:350000 },
  { MaDH:'DH004', MaSP:'SP012', SoLuong:1, DonGia:1290000 },
  { MaDH:'DH004', MaSP:'SP006', SoLuong:1, DonGia:299000 },
  { MaDH:'DH005', MaSP:'SP005', SoLuong:1, DonGia:32990000 },
  { MaDH:'DH006', MaSP:'SP010', SoLuong:1, DonGia:5490000 },
  { MaDH:'DH006', MaSP:'SP011', SoLuong:1, DonGia:350000 },
  { MaDH:'DH007', MaSP:'SP014', SoLuong:1, DonGia:9990000 },
  { MaDH:'DH008', MaSP:'SP006', SoLuong:1, DonGia:299000 },
  { MaDH:'DH008', MaSP:'SP007', SoLuong:1, DonGia:450000 }
];

export const payments = [
  { MaTT:'TT001', MaDH:'DH001', SoTien:22392000, NgayTT:'2024-12-01', MaPTTT:'PTTT001', TrangThai:'Đã thanh toán' },
  { MaTT:'TT002', MaDH:'DH002', SoTien:6015000, NgayTT:'2024-12-15', MaPTTT:'PTTT003', TrangThai:'Đã thanh toán' },
  { MaTT:'TT003', MaDH:'DH003', SoTien:28272000, NgayTT:'2025-01-10', MaPTTT:'PTTT002', TrangThai:'Đã thanh toán' },
  { MaTT:'TT004', MaDH:'DH004', SoTien:1618000, NgayTT:'2025-02-20', MaPTTT:'PTTT001', TrangThai:'Đã thanh toán' },
  { MaTT:'TT005', MaDH:'DH005', SoTien:33260000, NgayTT:'2025-03-05', MaPTTT:'PTTT004', TrangThai:'Đã thanh toán' },
  { MaTT:'TT006', MaDH:'DH006', SoTien:5840000, NgayTT:'2025-04-10', MaPTTT:'PTTT002', TrangThai:'Chờ thanh toán' },
  { MaTT:'TT007', MaDH:'DH007', SoTien:8224000, NgayTT:'2025-05-01', MaPTTT:'PTTT003', TrangThai:'Chờ thanh toán' },
  { MaTT:'TT008', MaDH:'DH008', SoTien:778000, NgayTT:'2025-05-12', MaPTTT:'PTTT001', TrangThai:'Chờ thanh toán' }
];

export const reviews = [
  { MaDG:'DG001', MaSP:'SP001', MaKH:'KH001', MaDH:'DH001', SoSao:5, NoiDung:'Điện thoại quá xịn, camera chụp đẹp lắm!', NgayDG:'2024-12-05' },
  { MaDG:'DG002', MaSP:'SP010', MaKH:'KH001', MaDH:'DH001', SoSao:5, NoiDung:'Tai nghe chống ồn cực tốt, âm thanh rõ ràng', NgayDG:'2024-12-05' },
  { MaDG:'DG003', MaSP:'SP010', MaKH:'KH002', MaDH:'DH002', SoSao:4, NoiDung:'Chất lượng tốt nhưng giá hơi cao', NgayDG:'2024-12-20' },
  { MaDG:'DG004', MaSP:'SP006', MaKH:'KH002', MaDH:'DH002', SoSao:4, NoiDung:'Áo đẹp, vải mát, giao hàng nhanh', NgayDG:'2024-12-20' },
  { MaDG:'DG005', MaSP:'SP004', MaKH:'KH003', MaDH:'DH003', SoSao:5, NoiDung:'MacBook xài mượt lắm, pin trâu', NgayDG:'2025-01-15' },
  { MaDG:'DG006', MaSP:'SP012', MaKH:'KH001', MaDH:'DH004', SoSao:4, NoiDung:'Nồi chiên ngon, dễ dùng, đáng tiền', NgayDG:'2025-02-25' },
  { MaDG:'DG007', MaSP:'SP002', MaKH:'KH003', MaDH:null, SoSao:5, NoiDung:'iPhone tuyệt vời, iOS mượt mà', NgayDG:'2025-01-20' },
  { MaDG:'DG008', MaSP:'SP003', MaKH:'KH001', MaDH:null, SoSao:4, NoiDung:'Xiaomi giá rẻ mà chất lượng, camera Leica đẹp', NgayDG:'2025-03-10' }
];

export const carts = [
  { MaGH:'GH001', MaKH:'KH001', NgayCapNhat:'2025-05-15' },
  { MaGH:'GH002', MaKH:'KH002', NgayCapNhat:'2025-05-14' },
  { MaGH:'GH003', MaKH:'KH003', NgayCapNhat:'2025-05-13' }
];

export const cartDetails = [
  { MaGH:'GH001', MaSP:'SP003', SoLuong:1 },
  { MaGH:'GH001', MaSP:'SP015', SoLuong:1 },
  { MaGH:'GH002', MaSP:'SP008', SoLuong:2 },
  { MaGH:'GH003', MaSP:'SP013', SoLuong:1 }
];
