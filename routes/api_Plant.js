var express = require('express');
var router = express.Router();
// Thêm model
const Plant = require('../model/Plants');

// Route POST để thêm plant
router.post('/add-plant', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body.
        const newPlant = new Plant({
            name: data.name,
            description: data.description,
            price: data.price
        }); // Tạo một đối tượng mới
        const result = await newPlant.save(); // Thêm vào database
        if (result) {
            // Nếu thêm thành công, trả về dữ liệu
            res.status(200).json({
                "status": 200,
                "message": "Thêm cây thành công",
                "data": result
            });
        } else {
            // Nếu thêm không thành công, trả về thông báo lỗi
            res.status(400).json({
                "status": 400,
                "message": "Lỗi, thêm cây không thành công",
                "data": []
            });
        }
    } catch (error) {
        console.error('Error:', error);
        // Trả về thông báo lỗi nếu có lỗi xảy ra
        res.status(500).json({
            "status": 500,
            "message": "Lỗi server",
            "data": []
        });
    }
});

module.exports = router;
