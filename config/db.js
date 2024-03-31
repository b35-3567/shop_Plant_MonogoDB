const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/MyDatabase", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connect success');
  } catch (error) {
    console.error('Connect fail:', error);
  }
};

module.exports = connectDB;
