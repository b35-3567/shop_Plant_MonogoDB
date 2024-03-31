// authRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controller/authController');

// Đăng nhập
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await loginUser(email, password);
        if (result.error) {
            return res.status(result.statusCode).json({ error: result.error });
        }
        res.json(result.userData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Đăng ký người dùng mới
router.post('/users', async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const result = await registerUser(email, name, password);
        if (result.error) {
            return res.status(result.statusCode).json({ error: result.error });
        }
        res.status(201).json(result.userData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
