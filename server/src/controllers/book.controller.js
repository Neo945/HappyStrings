/* eslint-disable consistent-return */
const validator = require('validator').default;
const Book = require('../models/book');
const Aurthor = require('../models/aurthor');
const Shop = require('../models/shop');
const { errorHandler } = require('../utils/errorHandler');
const { uploadSingle } = require('../config/s3.config');

module.exports = {
    // Get all the books
    getTopBooks: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                let books = await Book.aggregate([{ $sample: { size: 10 } }]);
                books = await Book.populate(books, { path: 'author' });
                res.status(200).json(books);
            },
            500
        );
    },
    getAllBooks: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const allBooks = await Book.find();
                res.status(200).json(allBooks);
            },
            500
        );
    },
    // Get a book by id
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
    // Get all the available books
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
    // Get all the books by the author id/ name
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
    // Get all the books by the category id/ name
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
    // Returns all the books which matches the search query
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
                    price: { $gt: 0 },
                })
                    .limit(10 * parseInt(req.params.page, 10))
                    .populate('author');
                res.status(200).json({ books });
            },
            500
        );
    },
    createBook: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                uploadSingle(req, res, async (err) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    }
                    const newBook = await Book.create({
                        ...req.body,
                        image: req.file.location,
                        author: validator.isMongoId(req.body.author) ? req.body.author : (await Aurthor.create({ name: req.body.author }))._id,
                        shop: validator.isMongoId(req.body.shop) ? req.body.shop : (await Shop.create({ ...req.body }))._id,
                    });
                    res.status(201).json({ book: newBook });
                });
            },
            500
        );
    },
    getAuthor: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const author = await Aurthor.find();
                res.status(200).json({ author });
            },
            500
        );
    },
};
