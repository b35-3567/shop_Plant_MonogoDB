// Admin.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Đảm bảo email là duy nhất
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
  
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
