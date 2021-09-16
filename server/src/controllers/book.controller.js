const Book = require('../models/book');
const Aurthor = require('../models/aurthor');
const Shop = require('../models/shop');
const { errorHandler } = require('../utils/errorHandler');

module.exports = {
    // Get all the books
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
                });
                res.status(200).json({ books });
            },
            500
        );
    },
    test: async (req, res) => {
        const a = await Aurthor.create({ name: 'J.R.R. Tolkien' });
        const shop = await Shop.create({
            name: 'Amazon',
            address: '123 Main St',
            phone: '9372518991',
            email: 'gmail@gmail.com',
            description: 'Best seller',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51',
            owner: 'a._iddvfhbjh',
        });
        const newBook = await Book.create({
            aurther: a._id,
            title: 'The Lord of the Rings',
            description: 'The Lord of the Rings is an epic high fantasy',
            category: 'Fantasy',
            stock: 10,
            price: 10,
            image: 'https://images-na.ssl-images-amazon.com/images/I/51ZuFnDwd3L._SX331_BO1,204,203,200_.jpg',
            shop: shop._id,
        });
        await newBook.remove();
        await a.remove();
        await shop.remove();
        res.status(200).json(newBook);
    },
};
