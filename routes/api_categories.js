// routes/categories.js
const express = require('express');
const router = express.Router();
const Categories = require('../model/Categories');
const Products = require('../model/Products');
const { addCategory, getAllCategories } = require('../controller/categoryController');

// Route to add a new category
router.post('/add_category', addCategory);

// Route to get all categories
router.get('/categories', getAllCategories);



/*
// Route để tìm tất cả các sản phẩm thuộc category hoặc có parentId là "65f9673765e44ff8a55f6121"
router.get('/product-by-category/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        // Tìm các sản phẩm có category là categoryId
        const productsByCategory = await Products.find({ category: categoryId });

        // Tìm các sản phẩm có parentId là categoryId
        const productsByParentId = await Products.find({ parentId: categoryId });

        // Kết hợp kết quả từ cả hai truy vấn
        const allProducts = [...productsByCategory, ...productsByParentId];

        // Trả về kết quả cho client
        res.json(allProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
*/
module.exports = router;
