const mongoose = require('mongoose');
const Book = require('./book');

const { Schema } = mongoose;

const AurthorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

AurthorSchema.post('remove', async (doc, next) => {
    await Book.remove({ aurther: doc._id });
    next();
});

const Aurthor = mongoose.model('Aurthor', AurthorSchema);
module.exports = Aurthor;
