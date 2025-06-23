# ✍️ Handwritten Digit Recognition (MNIST + Flask)

Đây là một dự án nhỏ của mình trong quá trình học **Trí tuệ nhân tạo (AI)** và **lập trình backend với Flask**. Ứng dụng cho phép người dùng vẽ một chữ số trên trình duyệt, sau đó dự đoán con số đó bằng mô hình học sâu đã được huấn luyện trên tập dữ liệu MNIST.

---

## 📌 Tính năng

- Giao diện đơn giản với canvas để vẽ chữ số
- Ảnh được gửi về backend Flask và chuyển thành mảng ảnh 28x28
- Mô hình CNN xử lý ảnh và trả về kết quả dự đoán
- Giao diện hiển thị số mà mô hình đoán được

---

## 🧠 Mô hình học máy

Mô hình sử dụng là một **CNN đơn giản** với các lớp:

- `Conv2D(32) → MaxPooling`
- `Conv2D(64) → MaxPooling`
- `Flatten → Dense(128) → Dense(10 softmax)`

Dữ liệu được xử lý và huấn luyện từ bộ **MNIST** của Keras.

---

## ⚙️ Cài đặt & chạy ứng dụng

### 1. Clone repo

```bash
git clone https://github.com/HuynhYen-code/MNIST.git
cd MNIST
```

### 2. Tạo môi trường ảo và cài thư viện
```bash
python -m venv venv
source venv/bin/activate         # Trên Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Chạy FLask server
```bash
python app.py
```

## 🧪 Huấn luyện lại mô hình (tuỳ chọn)
Nếu bạn muốn huấn luyện lại mô hình từ đầu:
```bash
python train_model.py
```
Bạn có thể thay đổi cấu trúc mạng (biến `model`) để thử nghiệm các kiến trúc khác nhau.

Mô hình sẽ được lưu tại model/mnist_cnn.keras.

## 📝 Ghi chú
- Dự án phục vụ mục đích học tập, chưa tối ưu về performance hoặc UX

- Mô hình có thể được cải thiện bằng preprocessing nâng cao hơn

- Hệ thống hiện tại chưa hỗ trợ nhận diện nhiều số cùng lúc

## 👤 Tác giả
Huỳnh Ngọc Phi Yến

GitHub: HuynhYen-code
