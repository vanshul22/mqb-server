const express = require('express');
const app = express();
const cors = require('cors');

// Added DotEnv for environment file
require('dotenv').config();

const port = process.env.PORT || 8000;

// Middleware for parsing JSON requests
app.use(express.json());

// Connect Database
const connectDB = require('./config/database.js');
connectDB();


const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000',"http://127.0.0.1:5500"]; // Added our frontend URL

const corsOptions = {
    origin: function (origin, callback) {
        (allowedOrigins.indexOf(origin) !== -1 || !origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'));
    }
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Routes setup
const userRoutes = require('./routes/user.js');
app.use('/api/users', userRoutes);
const ordersRoutes = require('./routes/order.js');
app.use('/api/orders', ordersRoutes);
const productsRoutes = require('./routes/product.js');
app.use('/api/products', productsRoutes);
const queryRoutes = require('./routes/query.js');
app.use('/api/query', queryRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});