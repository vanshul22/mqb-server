const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    query: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: Number,
        required: true,
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
querySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
