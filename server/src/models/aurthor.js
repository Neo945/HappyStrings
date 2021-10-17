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

const Author = mongoose.model('Author', AurthorSchema);
module.exports = Author;
