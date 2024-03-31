// Categories.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parentId: {
        type: ObjectId,
        ref: 'Categories' // Thay đổi từ 'Category' thành 'Categories' để phù hợp với tên collection
    },
});

const Categories = mongoose.model('Categories', CategoriesSchema);

module.exports = Categories;
