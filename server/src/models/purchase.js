const mongoose = require('mongoose');

const { Schema } = mongoose;

const purchaseSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Purchase = mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;
