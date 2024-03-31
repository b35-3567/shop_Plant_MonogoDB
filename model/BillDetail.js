// BillDetail.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const BillDetailSchema = new mongoose.Schema({
    user: {
        type: String, // Sử dụng kiểu dữ liệu String cho _id của người dùng
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    paymentMethod: { // Thêm trường hình thức thanh toán
        type: String,
        required: true
    },
    shippingMethod: { // Thêm trường phương thức vận chuyển
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

const BillDetail = mongoose.model('BillDetail', BillDetailSchema);

module.exports = BillDetail;
