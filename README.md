```markdown
# Tổng quan hệ thống (từ ảnh)

Tệp này tóm tắt các chức năng chính của hệ thống, mục đích, và các đối tượng (roles) sẽ sử dụng hệ thống, dựa trên bức ảnh tổng quan bạn cung cấp.

---

## Mục đích phần mềm

- Quản lý rõ ràng ai đang làm việc gì, thuận tiện giao việc và check KPI.
- Nhân viên biết được mình đang được giao việc gì, phối hợp và báo cáo dễ dàng (không cần check nhiều file Google Sheets).
- CEO/Quản lý nắm được bức tranh toàn bộ: dự án, khách hàng, nhân sự, tài chính; nhận cảnh báo khi có thay đổi quan trọng.
- Tự động thông báo/alert (ví dụ qua Telegram hoặc extension) khi có thay đổi quan trọng hoặc dữ liệu bất thường.
- Tích hợp và thay thế các file Excel rời rạc — "All in one".

---

## Các chức năng chính của hệ thống

1. Quản lý công việc (Task management)

   - Giao việc:
     - Giao tay (manual) hoặc AI tự động phân bổ (Ai giao).
     - Xác định người nhận, số lượng (ví dụ số account), chi tiết công việc (mô tả rất dài, file đính kèm, hashtag).
     - Cài đặt lặp lại (hàng ngày / 1 lần).
     - Đánh dấu tính chất: quan trọng / khẩn cấp / bình thường.
     - Mã UID cho task / account để truy vết.
   - Nhận việc:
     - Nhân viên xác nhận nhận task.
     - Hiển thị ngày giờ xác nhận để làm cơ sở theo dõi thời hạn.
   - Trạng thái & lịch sử:
     - Theo dõi tiến độ, thay đổi trạng thái, note lý do chưa hoàn thành.

2. Báo cáo & thống kê

   - Báo cáo MAR / Marketing: số lượng hoàn thành, thời hạn hoàn thành, lý do chưa hoàn thành, note khác.
   - Xem doanh số dự án theo link/chiến dịch, từ lúc bắt đầu đến hiện tại.
   - Hiệu suất làm việc của từng nhân viên và từng dự án (KPIs).
   - Báo cáo tài chính: nạp, giá dịch vụ, số tiền thực chạy, tỉ lệ chốt, số lần nạp, số tiền nạp trung bình...
   - Extension/Automation:
     - Extension tự động báo cáo các loại tài khoản (phân biệt theo UID).
     - Cảnh báo (alert) khi số liệu có biến động lớn (gửi Telegram, email...).

3. Quản lý dữ liệu khách hàng (Customer management)

   - Thêm khách mới (ADD), giá dịch vụ, tiền nạp, lịch sử nạp, các dịch vụ đã chạy, số lần nạp, tài khoản liên quan.
   - Danh sách khách: đầy đủ dữ liệu chi tiết của từng khách.
   - Cập nhật nhanh thông tin khách hàng và thay đổi trạng thái.

4. Tích hợp và thay thế file Excel

   - Nơi thay thế các file dữ liệu đang dùng hàng ngày.
   - Import / Export Excel, ALL IN ONE để tránh dùng nhiều file rời.
   - Cho phép upload/downloading file đính kèm cho task / account.

5. Bảng xếp hạng & gamification

   - Hiển thị ranking (cá nhân và đội).
   - Hiển thị các chương trình thưởng, điểm đổi thưởng như game.
   - Nơi nhân viên nhìn thấy thứ hạng, động lực thi đua.

6. Quản lý tài khoản & phân quyền

   - Login / phân quyền cho các vai trò: admin, VP, kế toán, nhân viên, ...
   - Các vai trò có quyền xem/điều chỉnh khác nhau (ví dụ kế toán chỉ xem phần liên quan tài chính).

7. Dashboard tổng quan & alert
   - Dashboard cho CEO/VP: báo cáo tổng hợp, công nợ, hiệu suất theo phòng ban, thông báo khẩn.
   - Alert/Notification khi có thay đổi lớn (khách mới, thay đổi trạng thái dự án, biến động doanh số).

---

## Các đối tượng sử dụng (Roles) và quyền chính

- VP AFFILIATE
  - Giao việc, xem báo cáo MAR, theo dõi tiến độ affiliate.
- VP AGENCY
  - Quản lý khách hàng agency, cập nhật thông tin khách, xem báo cáo tổng thể.
- CEO
  - Xem dashboard toàn cục, nhận alert ngay lập tức, đánh giá hiệu suất công ty theo dự án/khách hàng/nhân sự/tài chính.
- KẾ TOÁN / Finance
  - Xem/quản lý báo cáo tài chính, số liệu liên quan nạp tiền, chi phí, tỉ lệ chốt.
- Admin
  - Quản lý user, phân quyền, cấu hình hệ thống, tích hợp extension/alert.
- Nhân viên (Staff)
  - Nhận việc, xác nhận, cập nhật tiến độ, upload bằng chứng/các file liên quan.
- Người quản lý dự án / Team lead
  - Phân chia task, theo dõi KPI đội, xem ranking đội.
- Hệ thống tự động (AI / Extension)
  - Tự động phân bổ task, tự động gửi báo cáo/alert, tự động phân tích UID các account.

---

## Luồng hoạt động chính (tổng quan)

1. Admin/VP tạo hoặc hệ thống (AI) tự động phân bổ task -> gán người, số lượng, file/hướng dẫn.
2. Nhân viên nhận task -> xác nhận (ghi timestamp).
3. Nhân viên thực hiện -> cập nhật tiến độ / upload file bằng chứng.
4. Hệ thống tổng hợp: cập nhật báo cáo theo thời gian thực, tính KPI, cập nhật ranking.
5. Kế toán / VP / CEO xem báo cáo, nhận alert nếu có bất thường; CEO/VP ra quyết định dựa trên dashboard.
6. Dữ liệu có thể import/export Excel, extension tự động gửi báo cáo tài khoản theo UID.

---

## Tích hợp & yêu cầu phụ trợ

- Extension trình duyệt hoặc bot Telegram để:
  - Gửi cảnh báo real-time khi số liệu thay đổi.
  - Tự động thu thập dữ liệu account (theo UID) và báo cáo.
- Hỗ trợ upload nhiều file/đính kèm cho task.
- Lịch sử thay đổi / audit log cho các hành động quan trọng.
- Giao diện Dashboard thân thiện: biểu đồ hiệu suất, danh sách task sắp hết hạn, top performers.
- Khả năng lọc báo cáo theo dự án, nhân viên, khách hàng, khoảng thời gian.

---

## Ghi chú / Ưu tiên phát triển (đề xuất)

- Bắt đầu MVP với: quản lý task cơ bản (giao/nhận/hoàn thành), dashboard KPI đơn giản, quản lý khách hàng, import/export Excel.
- Bổ sung automation/extension và alert nâng cao ở giai đoạn 2.
- Thiết lập phân quyền chi tiết trước khi mở rộng tính năng tài chính.

---
```
