// Trong file util/emailSender.js

const nodemailer = require('nodemailer');

// Thiết lập transporter với các thông tin cần thiết
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'danhluong2k4@gmail.com', // Địa chỉ email của bạn
        pass: 'ukbx zbqk uspj xfxu' // Mật khẩu email của bạn
    }
});

// Hàm gửi email xác nhận đơn hàng
async function sendOrderConfirmationEmail(recipientEmail, billDetail) {
    try {
        // Tạo nội dung email
        const mailOptions = {
            from: 'danhluong2k4@gmail.com', // Địa chỉ email người gửi
            to: recipientEmail, // Địa chỉ email người nhận
            subject: 'Xác nhận đơn hàng', // Chủ đề của email
            text: `Xin chào,\n\nĐơn hàng của bạn đã được xác nhận. Chi tiết đơn hàng:\n\n${JSON.stringify(billDetail, null, 4)}`, // Nội dung của email
        };

        // Gửi email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = { sendOrderConfirmationEmail };
