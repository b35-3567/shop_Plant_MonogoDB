const express = require('express');
const UserModel = require('../model/user');
const router = express.Router();

// Viết hàm lấy dữ liệu từ MongoDB
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Route POST để thêm người dùng mới
router.post('/', async (req, res) => {
    try {
        const { fullname, email, password, phone, address } = req.body;
        const newUser = new User({ fullname, email, password, phone, address });
        await newUser.save(); // Lưu người dùng mới vào CSDL
        res.status(201).json(newUser); // Trả về người dùng mới đã được tạo
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
