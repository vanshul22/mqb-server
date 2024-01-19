const  mongoose = require('mongoose');
const { productSchema } = require('./product');


const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'completed', 'shipped', 'cancelled'],
        default: 'pending',
    },
    products: [productSchema], // Assuming an array of products in each order
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update timestamps on every save
orderSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = { orderSchema, Order };