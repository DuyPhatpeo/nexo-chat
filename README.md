# Nexo Chat

Nexo Chat là một ứng dụng chat thời gian thực với các tính năng như nhắn tin cá nhân, nhóm, quản lý bạn bè, xác thực người dùng và nhiều hơn nữa.

## Mục lục

- [Nexo Chat](#nexo-chat)
  - [Mục lục](#mục-lục)
  - [Giới thiệu](#giới-thiệu)
  - [Tính năng](#tính-năng)
  - [Cài đặt](#cài-đặt)
  - [Cấu trúc thư mục](#cấu-trúc-thư-mục)
  - [Chạy dự án](#chạy-dự-án)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Công nghệ sử dụng](#công-nghệ-sử-dụng)
  - [Đóng góp](#đóng-góp)

## Giới thiệu

Nexo Chat là hệ thống chat gồm backend (Node.js/Express) và frontend (React + Vite + TypeScript), hỗ trợ chat cá nhân, nhóm, quản lý bạn bè, xác thực JWT, realtime với Socket.IO.

## Tính năng

- Đăng ký, đăng nhập, đăng xuất
- Chat cá nhân và nhóm
- Gửi, nhận, xoá tin nhắn
- Gửi yêu cầu kết bạn, chấp nhận/từ chối
- Quản lý danh sách bạn bè
- Thông báo realtime (Socket.IO)
- Giao diện hiện đại, responsive

## Cài đặt

1. Clone repo:
   ```bash
   git clone https://github.com/DuyPhatpeo/nexo-chat.git
   cd nexo-chat
   ```
2. Cài đặt backend:
   ```bash
   cd backend
   npm install
   ```
3. Cài đặt frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## Cấu trúc thư mục

```
backend/
  src/
    controllers/      # Xử lý logic API
    libs/             # Thư viện dùng chung
    middlewares/      # Middleware cho Express
    models/           # Định nghĩa schema MongoDB
    routes/           # Định nghĩa route API
    socket/           # Xử lý Socket.IO
    utils/            # Tiện ích
frontend/
  src/
    components/       # React components
    hooks/            # Custom hooks
    lib/              # Thư viện dùng chung
    pages/            # Trang chính
    services/         # Giao tiếp API
    stores/           # Zustand stores
    types/            # Định nghĩa kiểu dữ liệu
```

## Chạy dự án

### Backend

```bash
cd backend
npm start
```

Mặc định chạy ở http://localhost:5001

### Frontend

```bash
cd frontend
npm run dev
```

Mặc định chạy ở http://localhost:5173

## Công nghệ sử dụng

- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Socket.IO
- Frontend: React, TypeScript, Vite, Zustand, TailwindCSS, Axios

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo pull request hoặc issue nếu bạn có ý tưởng hoặc phát hiện lỗi.

---

Tác giả: [Tên của bạn]
