// authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/Users');

// Đăng nhập
const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return { error: 'Email không tồn tại', statusCode: 404 };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: 'Mật khẩu không chính xác', statusCode: 401 };
        }

        const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' });

        return { userData: { userId: user._id, email: user.email, username: user.username, token } };
    } catch (error) {
        return { error: 'Lỗi máy chủ', statusCode: 500 };
    }
};

// Đăng ký người dùng mới
const registerUser = async (email, name, password) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { error: 'Email đã tồn tại', statusCode: 400 };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            name,
            password: hashedPassword,
        });

        return { userData: newUser };
    } catch (error) {
        return { error: 'Lỗi máy chủ', statusCode: 500 };
    }
};

module.exports = { loginUser, registerUser };
