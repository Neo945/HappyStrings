/* eslint-disable no-return-await */
const mongoose = require('mongoose');
const validator = require('validator').default;
const Author = require('./aurthor');
const Shop = require('./shop');

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
                values: [
                    'Fiction',
                    'Non-Fiction',
                    'Children',
                    'Others',
                    'Fantasy',
                    'Mystery',
                    'Thriller',
                    'Self-Help',
                    'Science',
                    'Education',
                ],
                message: '{VALUE} is not the correct type',
            },
        },
        language: {
            type: String,
            required: true,
            enum: {
                values: ['English', 'Hindi', 'Marathi', 'Gujarati', 'Sanskrit', 'Other'],
                message: '{VALUE} is not the correct type',
            },
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Author',
            required: true,
            validate: {
                validator: async function (value) {
                    return validator.isMongoId(String(value)) && (await Author.exists({ _id: value }));
                },
                message: '{VALUE} is not a valid ObjectId',
            },
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
            validate: {
                validator: async function (value) {
                    return validator.isMongoId(String(value)) && (await Shop.exists({ _id: value }));
                },
                message: '{VALUE} is not a valid ObjectId',
            },
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
