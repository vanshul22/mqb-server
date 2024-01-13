const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/database.js');

const port = process.env.PORT;

// Middleware for parsing JSON requests
app.use(express.json());

// Connect Database
connectDB();

// Routes setup
const userRoutes = require('./routes/user.js');
app.use('/api/users', userRoutes);
const ordersRoutes = require('./routes/user.js');
app.use('/api/orders', ordersRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});