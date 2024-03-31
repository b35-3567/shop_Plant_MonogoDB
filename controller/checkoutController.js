
/*const BillDetail = require('../model/BillDetail');
const ProductsInCart = require('../model/ProductsInCart');

async function processCheckout(req, res) {
    try {
        // Kiểm tra dữ liệu đầu vào
        const { userId, total, paymentMethod, shippingMethod, products } = req.body;
       

        // Tạo đối tượng BillDetail mới
        const billDetail = new BillDetail({
            user: userId,
            total,
            status: 'Pending',
            paymentMethod,
            shippingMethod,
            products
        });

        // Lưu hóa đơn vào cơ sở dữ liệu
        const savedBill = await billDetail.save();

        // Xóa các sản phẩm trong giỏ hàng của người dùng
        await ProductsInCart.deleteMany({ userId });

        // Trả về hóa đơn đã được lưu
        res.status(201).json(savedBill);
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi phản hồi thích hợp
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { processCheckout };
*/
const BillDetail = require('../model/BillDetail');
const ProductsInCart = require('../model/ProductsInCart');
const { sendOrderConfirmationEmail } = require('../util/emailSender');
/*
async function processCheckout(req, res) {
    try {
        // Kiểm tra dữ liệu đầu vào
        const { userId, total, paymentMethod, shippingMethod, products } = req.body;

        // Tạo đối tượng BillDetail mới
        const billDetail = new BillDetail({
            user: userId,
            total,
            status: 'Pending',
            paymentMethod,
            shippingMethod,
            products
        });

        // Lưu hóa đơn vào cơ sở dữ liệu
        const savedBill = await billDetail.save();

        // Gửi email xác nhận đơn hàng
        await sendOrderConfirmationEmail('your_email@gmail.com', savedBill); // Thay đổi địa chỉ email của bạn

        // Xóa các sản phẩm trong giỏ hàng của người dùng
        await ProductsInCart.deleteMany({ userId });

        // Trả về hóa đơn đã được lưu
        res.status(201).json(savedBill);
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi phản hồi thích hợp
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
*/
async function processCheckout(req, res) {
    try {
        // Kiểm tra dữ liệu đầu vào
        const { userId, total, paymentMethod, shippingMethod, products, email } = req.body;

        // Tạo đối tượng BillDetail mới
        const billDetail = new BillDetail({
            user: userId,
            total,
            status: 'Pending',
            paymentMethod,
            shippingMethod,
            products
        });

        // Lưu hóa đơn vào cơ sở dữ liệu
        const savedBill = await billDetail.save();

        // Gửi email xác nhận đơn hàng
        await sendOrderConfirmationEmail(email, savedBill); // Sử dụng địa chỉ email từ dữ liệu đầu vào

        // Xóa các sản phẩm trong giỏ hàng của người dùng
        await ProductsInCart.deleteMany({ userId });

        // Trả về hóa đơn đã được lưu
        res.status(201).json(savedBill);
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi phản hồi thích hợp
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { processCheckout };
