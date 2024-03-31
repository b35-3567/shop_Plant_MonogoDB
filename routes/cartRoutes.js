const express = require('express');
const router = express.Router();
const { 
    addProductToCart, 
    increaseQuantity, 
    decreaseQuantity, 
    getCartByUserId, 
    getAllCartProducts, 
    updateCartItem, 
    removeFromCart 
} = require('../controller/cartController');

router.post('/add_cart', addProductToCart);
router.put('/increase_quantity/:cartItemId', increaseQuantity);
router.put('/decrease_quantity/:cartItemId', decreaseQuantity);
router.get('/cart/:userId', getCartByUserId);
router.get('/cart', getAllCartProducts);
router.put('/update_item/:id', updateCartItem);
router.delete('/remove_from_cart/:id', removeFromCart);

module.exports = router;
