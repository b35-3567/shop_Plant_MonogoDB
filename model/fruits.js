const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const FruitSchema = new Schema({
    name: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    status: { type: Number }, // status = 1 => Còn hàng, 0 = Hết hàng, -1 => Ngừng kinh doanh
    image: { type: Array }, // Kiểu dữ liệu danh sách
    description: { type: String },
    id_distributor: { type: Schema.Types.ObjectId, ref: 'Distributor' },
}, { timestamps: true });

module.exports = mongoose.model('Fruit', FruitSchema);
