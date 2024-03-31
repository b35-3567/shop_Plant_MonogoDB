const ProductsInCart = require('../model/ProductsInCart');

// Thêm sản phẩm vào giỏ hàng
const addProductToCart = async (req, res) => {
    const { userId, productId, quantity} = req.body;

    try {
        const existingProduct = await ProductsInCart.findOne({ userId: userId, productId: productId });

        if (existingProduct) {
            existingProduct.quantity += quantity;
            const updatedProductInCart = await existingProduct.save();
            res.status(200).json(updatedProductInCart);
        } else {
            const newProductInCart = new ProductsInCart({
                userId: userId,
                productId: productId,
                quantity: quantity,
            });
            const savedProductInCart = await newProductInCart.save();
            res.status(201).json(savedProductInCart);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Tăng số lượng sản phẩm trong giỏ hàng
const increaseQuantity = async (req, res) => {
    const { cartItemId } = req.params;
  
    try {
      const cartItem = await ProductsInCart.findById(cartItemId);
      if (!cartItem) {
        return res.status(404).json({ success: false, message: 'Cart item not found.' });
      }
  
      cartItem.quantity += 1;
      await cartItem.save();
  
      res.status(200).json({ success: true, message: 'Quantity increased successfully.', cartItem });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};

// Giảm số lượng sản phẩm trong giỏ hàng
const decreaseQuantity = async (req, res) => {
    const { cartItemId } = req.params;
  
    try {
      const cartItem = await ProductsInCart.findById(cartItemId);
      if (!cartItem) {
        return res.status(404).json({ success: false, message: 'Cart item not found.' });
      }
  
      if (cartItem.quantity === 1) {
        return res.status(400).json({ success: false, message: 'Quantity cannot be decreased further.' });
      }
  
      cartItem.quantity -= 1;
      await cartItem.save();
  
      res.status(200).json({ success: true, message: 'Quantity decreased successfully.', cartItem });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};

// Lấy danh sách sản phẩm trong giỏ hàng của một người dùng
const getCartByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const cartProducts = await ProductsInCart.find({ userId });
        res.status(200).json(cartProducts);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Lấy danh sách tất cả sản phẩm trong giỏ hàng
const getAllCartProducts = async (req, res) => {
    try {
        const allCartProducts = await ProductsInCart.find();
        res.status(200).json(allCartProducts);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Cập nhật số lượng và giá của một sản phẩm trong giỏ hàng
const updateCartItem = async (req, res) => {
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
};

// Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = async (req, res) => {
    try {
      await ProductsInCart.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

module.exports = { 
    addProductToCart, 
    increaseQuantity, 
    decreaseQuantity, 
    getCartByUserId, 
    getAllCartProducts, 
    updateCartItem, 
    removeFromCart 
};
