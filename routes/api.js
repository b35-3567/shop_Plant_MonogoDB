var express = require('express');
var router = express.Router();
// Thêm model
const Distributor = require('../model/distributors');
const Fruits = require('../model/fruits');



// Route GET để lấy thông tin của một nhà phân phối dựa trên id
router.get('/distributors/:id', async (req, res) => {
    try {
        const distributorId = req.params.id;
        const distributor = await Distributor.findById(distributorId); // Tìm nhà phân phối theo id trong database
        if (!distributor) {
            return res.status(404).json({
                "status": 404,
                "messenger": "Không tìm thấy nhà phân phối",
                "data": []
            });
        }
        res.status(200).json({
            "status": 200,
            "messenger": "Lấy thông tin nhà phân phối thành công",
            "data": distributor
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            "status": 500,
            "messenger": "Lỗi server",
            "data": []
        });
    }
});

// Api thêm distributor
router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body
        const newDistributor = new Distributor({
            name: data.name
        }); // Tạo một đối tượng mới
        const result = await newDistributor.save(); // Thêm vào database
        if (result) {
            // Nếu thêm thành công
            res.status(200).json({
                "status": 200,
                "message": "Thêm thành công",
                "data": result
            });
        } else {
            // Nếu thêm không thành công
            res.status(400).json({
                "status": 400,
                "message": "Lỗi, thêm không thành công",
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "status": 500,
            "message": "Lỗi server",
            "data": []
        });
    }
});


// Route POST để thêm fruit
router.post('/add-fruit', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body.
        const newFruit = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: data.image,
            description: data.description,
            id_distributor: data.id_distributor
        }); //Tạo một đối tượng mới
        const result = await newFruit.save(); //Thêm vào database
        if (result) {
            // Nếu thêm thành công, trả về dữ liệu
            res.status(200).json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            });
        } else {
            // Nếu thêm không thành công, trả về thông báo lỗi
            res.status(400).json({
                "status": 400,
                "messenger": "Lỗi, thêm không thành công",
                "data": []
            });
        }
    } catch (error) {
        console.error('Error:', error);
        // Trả về thông báo lỗi nếu có lỗi xảy ra
        res.status(500).json({
            "status": 500,
            "messenger": "Lỗi server",
            "data": []
        });
    }
});


// Route GET để lấy tất cả các loại trái cây
router.get('/fruits', async (req, res) => {
    try {
        const fruits = await Fruits.find(); // Lấy tất cả các trái cây từ database
        res.status(200).json({
            "status": 200,
            "messenger": "Lấy dữ liệu thành công",
            "data": fruits
        }); // Trả về dữ liệu
    } catch (error) {
        console.error('Error:', error);
        // Trả về thông báo lỗi nếu có lỗi xảy ra
        res.status(500).json({
            "status": 500,
            "messenger": "Lỗi server",
            "data": []
        });
    }
});

// Route GET để lấy tất cả các nhà phân phối
router.get('/distributors', async (req, res) => {
    try {
        const distributors = await Distributor.find(); // Lấy tất cả các nhà phân phối từ database
        res.status(200).json({
            "status": 200,
            "messenger": "Lấy dữ liệu thành công",
            "data": distributors
        }); // Trả về dữ liệu
    } catch (error) {
        console.error('Error:', error);
        // Trả về thông báo lỗi nếu có lỗi xảy ra
        res.status(500).json({
            "status": 500,
            "messenger": "Lỗi server",
            "data": []
        });
    }
});
module.exports = router;
