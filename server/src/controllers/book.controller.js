const Book = require('../models/book');
const { errorHandler } = require('../utils/errorHandler');

module.exports = {
    getAllBooks: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const books = await Book.find();
                res.status(200).json(books);
            },
            500
        );
    },
    getBook: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const book = await Book.findById(req.params.id);
                res.status(200).json(book);
            },
            500
        );
    },
    getAvailableBook: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const books = await Book.find({ stock: { $gt: 0 } });
                res.status(200).json({ books });
            },
            500
        );
    },
    getAurthorBooks: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const books = await Book.find({ author: req.query.author });
                res.status(200).json({ books });
            },
            500
        );
    },
    getCategoryBooks: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const books = await Book.find({ category: req.query.category });
                res.status(200).json({ books });
            },
            500
        );
    },
    getSearchBooks: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const books = await Book.find({
                    $or: [
                        { title: { $regex: req.query.search, $options: 'i' } },
                        { aurthor: { $regex: req.query.search, $options: 'i' } },
                        { category: { $regex: req.query.search, $options: 'i' } },
                    ],
                });
                res.status(200).json({ books });
            },
            500
        );
    },
};
