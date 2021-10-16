const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
