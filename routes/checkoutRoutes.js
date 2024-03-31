const express = require('express');
const router = express.Router();
const { processCheckout  } = require('../controller/checkoutController');
const { sendOrderConfirmationEmail } = require('../util/emailSender');

router.post('/checkout', processCheckout);
/*
router.post('/checkout', async (req, res) => {
    try {
        // Thực hiện thanh toán và thêm order vào cơ sở dữ liệu
        const savedBill = await processCheckout(req, res);

        // Lấy email của người dùng từ req.body hoặc từ cơ sở dữ liệu
        const userEmail = req.body.email; // Thay thế bằng cách lấy email từ cơ sở dữ liệu của bạn

        // Gửi email thông tin đơn hàng
        await sendOrderConfirmationEmail(userEmail, savedBill);

        // Trả về kết quả
        res.status(201).json({ message: 'Checkout process completed successfully' });
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
*/
module.exports = router;
