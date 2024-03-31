// Import thư viện Express
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Import thư viện bcryptjs

const users = [
    { id: 1, name: 'Traa thijj anh', email: 'anhd@gmail.com', phone: '0987654321', pass: '12345' }
];

// Route get để xử lý đăng nhập
router.get('/login', function(req, res) {
    const { email, pass } = req.query; // Lấy thông tin email và pass từ tham số của URL

    // Tìm kiếm user trong danh sách users với email tương ứng
    const user = users.find(user => user.email === email);

    if (!user) {
        // Trả về lỗi nếu không tìm thấy user
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // So sánh mật khẩu đã mã hóa với mật khẩu người dùng nhập vào
    bcrypt.compare(pass, user.pass, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error comparing passwords' });
        }
        if (!result) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Nếu mật khẩu đúng, trả về thông tin user
        return res.json(user);
    });
});

// Route POST để xử lý đăng ký
router.post('/register', function(req, res) {
    const { name, email, phone, pass } = req.body; // Lấy thông tin từ body của request

    // Kiểm tra xem email đã tồn tại trong danh sách users chưa
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        // Trả về lỗi nếu email đã tồn tại
        return res.status(400).json({ message: 'Email already exists' });
    }

    // Mã hóa mật khẩu
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({ message: 'Error generating salt' });
        }
        bcrypt.hash(pass, salt, (err, hash) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password' });
            }

            // Tạo user mới với mật khẩu đã được mã hóa
            const newUser = { id: users.length + 1, name, email, phone, pass: hash };
            users.push(newUser);

            // Trả về thông tin user mới đã được tạo
            return res.status(201).json(newUser);
        });
    });
});

module.exports = router;
