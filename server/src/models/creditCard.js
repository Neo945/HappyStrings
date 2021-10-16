const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator').default;

const { Schema } = mongoose;

const cardSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        cardType: {
            type: String,
            required: true,
            enum: ['Visa', 'MasterCard', 'American Express', 'Discover'],
        },
        cardNumber: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return validator.isCreditCard(v);
                },
                message: '{VALUE} is not a valid credit card number',
            },
        },
        expirationDate: {
            type: String,
            required: true,
        },
        cvv: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

cardSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.cvv = await bcrypt.hash(this.cvv, salt);
    next();
});

cardSchema.statics.verifyCvv = async function (cvv, user, cardNumber) {
    const card = await this.findOne({ user, cardNumber });
    if (!card) {
        return false;
    }
    // eslint-disable-next-line no-return-await
    return await bcrypt.compare(cvv, card.cvv);
};

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
