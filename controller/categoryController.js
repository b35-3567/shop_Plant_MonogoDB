const Categories = require('../model/Categories');
const Product = require('../model/Products');
const addCategory = async (req, res) => {
    try {
        let { name, parentId } = req.body;

        // Kiểm tra nếu parentId không được cung cấp, gán giá trị mặc định là null
        if (!parentId) {
            parentId = null;
        }

        const category = new Categories({
            name,
            parentId
        });
        
        const savedCategory = await category.save();
        res.json(savedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = { addCategory, getAllCategories };
