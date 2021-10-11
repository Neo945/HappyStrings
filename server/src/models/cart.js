const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
    },
    quantity: {
        type: Number,
        default: 1,
    },
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
