const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const userController = require('../controllers/user');

// Define user routes
router.post('/', userController.createUser); // Auth-Token not required.
router.post('/signin', userController.signinUser); // Auth-Token not required.
router.post('/check-signin', authenticateToken, userController.checkSignin); // Auth-Token not required.
router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;