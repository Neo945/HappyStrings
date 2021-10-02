const { User, BaseUser } = require('../models/user');
const Book = require('../models/book');
const Purchase = require('../models/purchase');
const Order = require('../models/Order');
const { errorHandler } = require('../utils/errorHandler');
const transport = require('../config/mailer.config');

module.exports = {
    getUser: (req, res) => {
        errorHandler(req, res, async () => {
            const artist = await User.findOne({ user: req.user._id }).populate('BaseUser', '-password');
            res.status(200).json({ message: 'success', artist });
        });
    },
    createUserForBaseUser: (req, res) => {
        errorHandler(req, res, async () => {
            const newAccount = await User.create({ ...req.body, user: req.user._id });
            res.status(201).json({ message: 'success', user: newAccount });
        });
    },
    registerUser: (req, res) => {
        errorHandler(req, res, async () => {
            const newUser = await BaseUser.create({ ...req.body });
            res.status(201).json({ message: 'success', user: { ...newUser, password: null } });
        });
    },
    login: (req, res) => {
        errorHandler(req, res, async () => {
            const { password, email } = req.body;
            const token = await BaseUser.login(email, password);
            if (token) {
                res.cookie('jwt', token, {
                    maxAge: require('../config/config').TOKEN_LENGTH,
                });
                const user = await BaseUser.findOne({ email });
                res.status(201).json({
                    mesage: 'login Successful',
                    user: await User.findOne({ user: user._id }).populate('BaseUser', '-password'),
                });
            } else {
                res.clearCookie('jwt');
                res.status(403).json({ mesage: 'Login unsuccessful' });
            }
        });
    },
    logout: (req, res) => {
        errorHandler(req, res, () => {
            try {
                req.logout();
            } catch (err) {
                console.log(err);
            }
            res.clearCookie('jwt');
            res.json({ mesage: 'Logged out successfully' });
        });
    },
    googleOauthRedirect: (req, res) => {
        res.redirect('http://localhost:3000/');
    },
    sendEmailVerfication: async (req, res) => {
        errorHandler(req, res, async () => {
            const { email } = req.body;
            const token = await BaseUser.generateEmailVerificationToken(email);
            if (token) {
                const url = `http://localhost:3000/verify/${token}`;
                const message = `<h1>Please verify your email</h1>
                    <p>Click on the link below to verify your email</p>
                    <a href="${url}">${url}</a>`;
                transport(req.user.email, 'Learnit Verification', message);
                res.json({ message: 'success' });
            } else {
                res.json({ message: 'User not found' });
            }
        });
    },
    verifyEmailToken: async (req, res) => {
        errorHandler(req, res, async () => {
            const { token } = req.query;
            const isVerified = await BaseUser.verifyEmailToken(req._id, token);
            if (isVerified) {
                res.json({ message: 'success' });
            } else {
                res.json({ message: 'User not found' });
            }
        });
    },
    addToCart: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const user = await User.findOneAndUpdate({ user: req.user._id }, { $push: { cart: req.params.id } });
                res.status(200).json(user);
            },
            500
        );
    },
    addToWishlist: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const user = await User.findOneAndUpdate({ user: req.user._id }, { $push: { wishlist: req.params.id } });
                res.status(200).json(user);
            },
            500
        );
    },
    purchaseBook: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const user = await User.findOne({ user: req.user._id });
                const book = await Book.findOne({ _id: req.body.id });
                book.stock -= req.body.quantity;
                await book.save();
                const purchase = await Purchase.create({ user: user._id, book: book._id, quantity: req.body.quantity });
                const order = await Order.create({ user: user._id, purchase: purchase._id });
                res.status(200).json({ message: 'success', order });
            },
            500
        );
    },
    getCart: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const user = await User.findOne({ user: req.user._id }).populate('Book', '-_id -__v -stock');
                res.status(200).json({ message: 'success', cart: { ...user.cart } });
            },
            500
        );
    },
    getWishlist: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const user = await User.findOne({ user: req.user._id }).populate('Book', '-_id -__v -stock');
                res.status(200).json({ message: 'success', wishlist: { ...user.wishlist } });
            },
            500
        );
    },
    getPurchaseHistory: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const user = await User.findOne({ user: req.user._id });
                const purchase = await Purchase.find({ user: user._id }).populate('Book', '-_id -__v -stock');
                res.status(200).json({ message: 'success', purchase: { ...purchase } });
            },
            500
        );
    },
};
