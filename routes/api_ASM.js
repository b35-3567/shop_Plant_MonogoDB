const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
 // Import thư viện bcrypt
const jwt = require('jsonwebtoken');
const User = require('../model/Users');
const CartDetail = require('../model/BillDetail.js');
const ProductsInCart = require('../model/ProductsInCart');
const Products = require('../model/Products');
const BillDetail=require('../model/BillDetail')
// API endpoint để đăng nhập
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng dựa trên email
        const user = await User.findOne({ email });

        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            return res.status(404).json({ message: 'Email không tồn tại' });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mật khẩu không chính xác' });
        }

        // Tạo mã thông báo xác thực
        const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' });

        // Trả về thông tin tài khoản cùng với mã thông báo xác thực
        res.json({ 
            userId: user._id,
            email: user.email,
            username: user.username, // Thêm tên người dùng nếu có
            // Các thông tin khác mà bạn muốn hiển thị
            token 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API endpoint để tạo một người dùng mới
router.post('/users', async (req, res) => {
    const { email, name, password } = req.body;

    try {
        // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = await User.create({
            email,
            name,
            password: hashedPassword, // Lưu mật khẩu đã được mã hóa
            
        });

        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Thêm các API endpoints cho Products và ProductsInCart tương tự như trên
// Endpoint để thêm sản phẩm vào giỏ hàng


// API endpoint để thêm một sản phẩm vào giỏ hàng
router.post('/add_cart', async (req, res) => {
    const { userId, productId, quantity} = req.body;

    try {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingProduct = await ProductsInCart.findOne({ userId: userId, productId: productId });

        if (existingProduct) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng lên 1
            existingProduct.quantity += 1;
            const updatedProductInCart = await existingProduct.save();
            res.status(200).json(updatedProductInCart);
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
            const newProductInCart = new ProductsInCart({
                userId: userId,
                productId: productId,
                quantity: 1,  // Số lượng ban đầu là 1
            });
            const savedProductInCart = await newProductInCart.save();
            res.status(201).json(savedProductInCart);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

////////////////////////////////////////////////////////////////////
// Route PUT để tăng số lượng sản phẩm trong giỏ hàng
router.put('/increase_quantity/:cartItemId', async (req, res) => {
    const { cartItemId } = req.params;
  
    try {
      // Tìm sản phẩm trong giỏ hàng dựa trên cartItemId
      const cartItem = await ProductsInCart.findById(cartItemId);
      if (!cartItem) {
        return res.status(404).json({ success: false, message: 'Cart item not found.' });
      }
  
      // Tăng số lượng sản phẩm lên 1
      cartItem.quantity += 1;
  
      // Lưu thay đổi vào cơ sở dữ liệu
      await cartItem.save();
  
      res.status(200).json({ success: true, message: 'Quantity increased successfully.', cartItem });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Route PUT để giảm số lượng sản phẩm trong giỏ hàng
  router.put('/decrease_quantity/:cartItemId', async (req, res) => {
    const { cartItemId } = req.params;
  
    try {
      // Tìm sản phẩm trong giỏ hàng dựa trên cartItemId
      const cartItem = await ProductsInCart.findById(cartItemId);
      if (!cartItem) {
        return res.status(404).json({ success: false, message: 'Cart item not found.' });
      }
  
      // Kiểm tra nếu số lượng đã là 1, không thể giảm nữa
      if (cartItem.quantity === 1) {
        return res.status(400).json({ success: false, message: 'Quantity cannot be decreased further.' });
      }
  
      // Giảm số lượng sản phẩm đi 1
      cartItem.quantity -= 1;
  
      // Lưu thay đổi vào cơ sở dữ liệu
      await cartItem.save();
  
      res.status(200).json({ success: true, message: 'Quantity decreased successfully.', cartItem });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });




////////////////////////////////////////////////////////////////////

// GET /cart/:userId
router.get('/cart/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Tìm kiếm sản phẩm trong giỏ hàng của userId đã được lưu trong CSDL
        const cartProducts = await ProductsInCart.find({ userId });

        // Trả về danh sách sản phẩm trong giỏ hàng dưới dạng JSON
        res.status(200).json(cartProducts);
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// GET /cart
router.get('/cart', async (req, res) => {
    try {
        // Tìm kiếm tất cả các sản phẩm trong giỏ hàng
        const allCartProducts = await ProductsInCart.find();

        // Trả về danh sách tất cả sản phẩm trong giỏ hàng dưới dạng JSON
        res.status(200).json(allCartProducts);
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Route để cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/update_item/:id', async (req, res) => {
    const { quantity, price } = req.body;
  
    try {
      const updatedProductInCart = await ProductsInCart.findByIdAndUpdate(
        req.params.id,
        { quantity: quantity, price: price },
        { new: true }
      );
  
      res.status(200).json(updatedProductInCart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

  
  // Route để xóa sản phẩm khỏi giỏ hàng
  router.delete('/remove_from_cart/:id', async (req, res) => {
    try {
      await ProductsInCart.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
///////////////////////////////////////////////////////////////////////////////////////////////////
// Định nghĩa API endpoint để xử lý việc chuyển từ giỏ hàng sang hóa đơn
// Định nghĩa endpoint /checkout
router.post('/checkout', async (req, res) => {
  try {
      const { userId, total, paymentMethod, shippingMethod, products } = req.body;

      // Tạo một hóa đơn mới từ dữ liệu nhận được từ request body
      const newBill = new BillDetail({
          user: userId, // Sử dụng userId từ request body
          total,
          status: 'pending', // Có thể thay đổi trạng thái nếu cần
          paymentMethod,
          shippingMethod,
          products: products.map(item => ({ product: item.productId, quantity: item.quantity }))
      });

      // Lưu hóa đơn mới vào cơ sở dữ liệu
      await newBill.save();

      // Cập nhật trạng thái của các sản phẩm trong giỏ hàng đã được mua
      // Code cập nhật trạng thái sản phẩm ở đây (nếu cần)

      // Xóa các mục trong giỏ hàng
      await ProductsInCart.deleteMany({ userId });

      // Trả về kết quả thành công
      res.json({ message: 'Đơn hàng đã được xử lý thành công.' });
  } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Lỗi khi xử lý đơn hàng:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi xử lý đơn hàng.' });
  }
});




module.exports = router;
