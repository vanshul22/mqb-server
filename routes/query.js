const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const queryController = require('../controllers/query');

// Define product routes
router.post('/', authenticateToken, queryController.getQuery);

module.exports = router;