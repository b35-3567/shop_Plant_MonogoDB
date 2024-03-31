const mongoose = require("mongoose");
//khai báo scheman cho user
const UserSchema = new mongoose.Schema({
    fullname: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    address: { type: String }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
