// Products.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    category: {
        type: ObjectId, // Đổi từ 'category_id' thành 'category'
        ref: 'Categories' // Thay đổi từ 'Category' thành 'Categories'
    },
    parentCategory: {
        type: ObjectId,
        ref: 'Categories'
    },
   size: {
        type: String,
        required: true // Sửa lỗi chính tả, từ 'require' thành 'required'
    },
    origin: {
        type: String,
        required: true // Sửa lỗi chính tả, từ 'require' thành 'required'
    }
});

const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;
