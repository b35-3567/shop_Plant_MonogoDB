// Users.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
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

const User = mongoose.model('User', UserSchema);

module.exports = User;
