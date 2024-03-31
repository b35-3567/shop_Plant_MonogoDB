// adminController.js
const Admin = require('../model/Admin');
const User = require('../model/Users');

// Hàm đăng ký admin
const registerAdmin = async (email, name, password) => {
    try {
        // Kiểm tra xem email đã tồn tại trong bảng Admin hay không
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return { error: 'Email đã tồn tại trong Admin' };
        }

        // Kiểm tra xem email đã tồn tại trong bảng User hay không
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { error: 'Email đã tồn tại trong User' };
        }

        // Tạo admin mới
        const newAdmin = await Admin.create({
            email,
            name,
            password,
        });

        return { admin: newAdmin };
    } catch (err) {
        return { error: err.message };
    }
};

// Hàm đăng nhập admin
const loginAdmin = async (email, password) => {
    try {
        // Tìm admin trong cơ sở dữ liệu dựa trên email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return { error: 'Admin không tồn tại' };
        }

        // Kiểm tra mật khẩu
        if (admin.password !== password) {
            return { error: 'Mật khẩu không đúng' };
        }

        return { message: 'Đăng nhập thành công' };
    } catch (err) {
        return { error: err.message };
    }
};

module.exports = { registerAdmin, loginAdmin };
