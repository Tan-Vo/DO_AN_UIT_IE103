#  Đồ án Cơ sở dữ liệu (IE103) - Hệ thống Thương mại điện tử

[![Database](https://img.shields.io/badge/Database-SQL-00758F.svg?style=for-the-badge&logo=mysql&logoColor=white)](https://www.oracle.com/)
[![UIT](https://img.shields.io/badge/UIT-IE103-005691.svg?style=for-the-badge)](https://www.uit.edu.vn/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Completed-emerald.svg?style=for-the-badge)](#)

Báo cáo & Thiết kế Cơ sở dữ liệu cho **Hệ thống Thương mại điện tử (E-Commerce System)** thuộc môn học **IE103 - Cơ sở dữ liệu** tại Trường Đại học Công nghệ Thông tin (UIT - VNU-HCM).

---

##  Tổng quan Đồ án

Dự án tập trung vào việc nghiên cứu, thiết kế và chuẩn hóa **Mô hình Cơ sở dữ liệu Quan hệ (Relational Database Schema)** cho một hệ thống sàn Thương mại Điện tử quy mô thực tế. Đồ án giải quyết bài toán lưu trữ và tối ưu hóa tốc độ xử lý cho 3 luồng nghiệp vụ cốt lõi:

1.  **Quản lý Kho & Danh mục Sản phẩm**: Quản lý biến thể sản phẩm, danh mục đa cấp, nhà cung cấp và tồn kho theo thời gian thực.
2.  **Xử lý Đơn hàng & Giỏ hàng**: Theo dõi trạng thái đơn hàng (chờ xác nhận, đang giao, hoàn thành, hủy), tính toán giá trị đơn và chiết khấu.
3.  **Ràng buộc Toàn vẹn & Trigger**: Tự động hóa kiểm tra tồn kho, đảm bảo tính nhất quán dữ liệu và chống sai lệch giá trị khi có giao dịch phát sinh.

---

##  Kiến trúc & Thiết kế CSDL

- **Mô hình Thực thể Ràng buộc (ERD / EERD)**: Chuẩn hóa từ mô hình khái niệm sang mô hình quan hệ đạt **Chuẩn 3NF / BCNF**.
- **Ngôn ngữ thực thi**: SQL (DDL, DML, DCL).
- **Tính năng nâng cao**:
  - **Stored Procedures / Functions**: Xử lý các phép tính phức tạp như thống kê doanh thu, tính tổng tiền đơn hàng.
  - **Triggers**: Tự động trừ số lượng kho khi đặt hàng thành công, chặn hủy đơn khi đã giao hàng.
  - **Indexing**: Đánh chỉ mục trên các khóa chính, khóa ngoại và các trường tìm kiếm thường xuyên để tối ưu truy vấn.

---

##  Cấu trúc Repository

```text
DO_AN_UIT_IE103/
├── Docs/               # Báo cáo đồ án, Sơ đồ ERD, Mô hình quan hệ
├── SQL/                # Script khởi tạo CSDL, Data mẫu & Triggers
│   ├── Create_Tables.sql    # DDL khởi tạo bảng & khóa chính/ngoại
│   ├── Triggers_Procedures.sql # Trigger & Stored Procedure nghiệp vụ
│   └── Insert_Data.sql      # Dữ liệu mẫu thử nghiệm
└── README.md           # Tài liệu hướng dẫn đồ án
