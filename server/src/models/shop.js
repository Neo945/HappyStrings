const mongoose = require('mongoose');
const validator = require('validator').default;

const { Schema } = mongoose;

const ShopSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            validate: [validator.isMobilePhone, 'Invalid phone number'],
        },
        email: {
            type: String,
            required: true,
            validate: [validator.isEmail, 'Invalid email'],
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 500,
        },
        image: {
            type: String,
            required: true,
            verify: [validator.isURL, 'Invalid image url'],
        },
        owner: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Shop = mongoose.model('Shop', ShopSchema);
module.exports = Shop;
