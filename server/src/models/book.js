const mongoose = require('mongoose');
const validator = require('validator').default;

const { Schema } = mongoose;

const BookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 1000,
        },
        category: {
            type: String,
            required: true,
            enum: {
                values: ['Fiction', 'Non-Fiction', 'Children', 'Others', 'Fantasy'],
                message: '{VALUE} is not the correct type',
            },
        },
        aurther: {
            type: Schema.Types.ObjectId,
            ref: 'Aurthor',
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
            validate: [validator.isURL, 'Invalid URL'],
        },
        shop: {
            type: Schema.Types.ObjectId,
            ref: 'Shop',
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            minValue: 0,
            maxValue: 100,
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
