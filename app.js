const express = require('express');
const app = express();
// Added DotEnv for environment file
require('dotenv').config();

const port = process.env.PORT || 8001;

// Middleware for parsing JSON requests
app.use(express.json());

// Connect Database
const connectDB = require('./config/database.js');
connectDB();

// Routes setup
const userRoutes = require('./routes/user.js');
app.use('/api/users', userRoutes);
const ordersRoutes = require('./routes/order.js');
app.use('/api/orders', ordersRoutes);
const productsRoutes = require('./routes/product.js');
app.use('/api/products', productsRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});