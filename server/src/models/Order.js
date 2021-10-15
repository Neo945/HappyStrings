const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema(
    {
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Purchase',
            required: true,
        },
        status: {
            type: String,
            enum: ['On the way', 'shipped', 'etc'],
            default: 'On the way',
            required: true,
        },
    },
    {
        timestamp: true,
    }
);

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
