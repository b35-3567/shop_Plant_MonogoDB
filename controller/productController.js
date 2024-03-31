const Products = require('../model/Products');

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin của một sản phẩm cụ thể
const getProductById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Thêm một sản phẩm mới
const addProduct = async (req, res) => {
    try {
        const { name, price, images, description, category, parentCategory, size, origin } = req.body;
        const product = new Products({
            name,
            price,
            images,
            description,
            category,
            parentCategory: null,
            size,
            origin
        });
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
//parent id
const getProductsByParentCategory = async (req, res) => {
    try {
        const parentCategoryId = req.params.parentCategoryId; // Sử dụng req.params nếu bạn truyền parentCategoryId qua URL

        // Tìm tất cả các sản phẩm có parentCategory là parentCategoryId
        const products = await Products.find({ parentCategory: parentCategoryId });

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//sub_id
//parent id
const getProductsBySubCategory = async (req, res) => {
    try {
        const  category = req.params.category; // Sử dụng req.params nếu bạn truyền parentCategoryId qua URL

        // Tìm tất cả các sản phẩm có parentCategory là parentCategoryId
        const products = await Products.find({ 
            category: category });

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = { getAllProducts, getProductById, addProduct,getProductsByParentCategory,getProductsBySubCategory };
