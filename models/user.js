const  mongoose  = require("mongoose");
const { orderSchema } = require("./order");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
    },
    orders: [orderSchema],
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
userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = { userSchema, User };
