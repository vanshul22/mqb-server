const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
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
productSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = { productSchema, Product };
