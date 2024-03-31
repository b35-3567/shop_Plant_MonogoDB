// productsRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Products = require('../model/Products');
const { getAllProducts, getProductById, addProduct,getProductsByParentCategory,getProductsBySubCategory } = require('../controller/productController');
const productsController = require('../controller/productController');
// Route để lấy tất cả sản phẩm
router.get('/products', getAllProducts);

// Route để lấy thông tin của một sản phẩm cụ thể
router.get('/products/:id', getProductById);

// Route để thêm một sản phẩm mới
router.post('/add_product', addProduct);
//

// Route để lấy ra các sản phẩm có cùng parentCategory
router.get('/products-by-parent-category/:parentCategoryId', getProductsByParentCategory);
// Route để lấy ra các sản phẩm có cùng subCategory
router.get('/products-by-sub-category/:category', getProductsBySubCategory);
module.exports = router;
