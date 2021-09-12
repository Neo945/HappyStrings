const mongoose = require('mongoose');

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

const Aurthor = mongoose.model('Aurthor', AurthorSchema);
module.exports = Aurthor;
