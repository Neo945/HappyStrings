const Book = require('../models/book');
const Aurthor = require('../models/aurthor');
const Shop = require('../models/shop');
const { errorHandler } = require('../utils/errorHandler');

module.exports = {
    // Get all the books
    getTopBooks: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const books = await Book.aggregate([{ $sample: { size: 10 } }]);
                res.json(books);
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
                }).limit(10 * req.params.page);
                res.status(200).json({ books });
            },
            500
        );
    },
    createBook: async (req, res) => {
        const { shop, author, book } = req.body;
        errorHandler(
            req,
            res,
            async () => {
                const newBook = await Book.create({
                    ...book,
                    author: author.id ? author.id : (await Aurthor.create({ ...author }))._id,
                    shop: shop.id ? shop.id : (await Shop.create({ ...shop }))._id,
                });
                res.status(201).json(newBook);
            },
            500
        );
    },
};
