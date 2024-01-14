const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const orderController = require('../controllers/order');

// Define order routes
router.post('/', authenticateToken, orderController.createOrder);
router.get('/', authenticateToken, orderController.getAllOrders);
router.get('/:id', authenticateToken, orderController.getOrderById);
router.put('/:id', authenticateToken, orderController.updateOrder);
router.delete('/:id', authenticateToken, orderController.deleteOrder);


module.exports = router;