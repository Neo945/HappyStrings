/* eslint-disable no-await-in-loop */
const { User, BaseUser } = require('../models/user');
const Cart = require('../models/cart');
const Book = require('../models/book');
const Purchase = require('../models/purchase');
const Order = require('../models/Order');
const { errorHandler } = require('../utils/errorHandler');
const transport = require('../config/mailer.config');
const Card = require('../models/creditCard');

module.exports = {
    getUser: (req, res) => {
        errorHandler(req, res, async () => {
            const artist = await User.findOne({ user: req.user._id }).populate('BaseUser', '-password');
            res.status(200).json({ message: 'success', artist });
        });
    },
    createUserForBaseUser: (req, res) => {
        errorHandler(req, res, async () => {
            const newAccount = await User.create({
                ...req.body,
                user: (await BaseUser.findOne({ email: req.body.email }))._id,
            });
            res.status(201).json({ message: 'success', user: newAccount });
        });
    },
    registerUser: (req, res) => {
        // eslint-disable-next-line consistent-return
        errorHandler(req, res, async () => {
            if (await BaseUser.exists({ email: req.body.email })) {
                return res.status(200).json({ message: 'Email already exists' });
            }
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
                    maxAge: 259200000,
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
                console.log(req.body);
                if (await Cart.exists({ user: req.user._id, book: req.body._id })) {
                    const cart = await Cart.findOne({ user: req.user._id, book: req.body._id });
                    cart.quantity += 1;
                    await cart.save();
                } else {
                    await Cart.create({
                        user: req.user._id,
                        book: req.body._id,
                        quantity: 1,
                    });
                }
                const cart = await Cart.find({ user: req.user._id }).populate('book');
                res.status(200).json({ message: 'success', cart });
            },
            500
        );
    },
    removeAllFromCart: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const cart = await Cart.findOne({ user: req.user._id, book: req.body._id });
                await cart.remove();
                const updatedCart = await Cart.find({ user: req.user._id }).populate('book');
                res.status(200).json({ message: 'success', cart: updatedCart });
            },
            500
        );
    },
    removeFromCart: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const cart = await Cart.findOne({ user: req.user._id, book: req.body._id });
                if (cart.quantity > 1) {
                    cart.quantity -= 1;
                    await cart.save();
                } else {
                    await cart.remove();
                }
                const updatedCart = await Cart.find({ user: req.user._id }).populate('book');
                res.status(200).json({ message: 'success', cart: updatedCart });
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
            // eslint-disable-next-line consistent-return
            async () => {
                if (!(await Card.varify(req.body.infomation.cvv, req.user._id, req.body.infomation.cardNumber))) {
                    return res.status(403).json({ message: 'Card is not verified' });
                }
                const user = await User.findOne({ user: req.user._id });
                const orderlist = [];
                // eslint-disable-next-line no-restricted-syntax
                for (const book of user.cart) {
                    const bookToPurchase = await Book.findById(book.book._id);
                    if (bookToPurchase.stock - book.quantity >= 0) bookToPurchase.stock -= book.quantity;
                    else return res.status(400).json({ message: 'Not enough stock' });
                    await bookToPurchase.save();
                    const purchase = await Purchase.create({ user: user._id, book: book.book._id, quantity: book.quantity });
                    const order = await Order.create({ user: user._id, purchase: purchase._id });
                    orderlist.push(order._id);
                }
                res.status(201).json({ message: 'success', orderlist });
            },
            500
        );
    },
    getCart: async (req, res) => {
        errorHandler(
            req,
            res,
            // eslint-disable-next-line consistent-return
            async () => {
                if (req.user !== null) {
                    const cart = await Cart.find({ user: req.user._id }).populate('book');
                    return res.status(200).json({ message: 'success', cart });
                }
                res.status(401).json({ message: 'Unauthrized' });
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
    getOrder: async (req, res) => {
        errorHandler(
            req,
            res,
            async () => {
                const user = await User.findOne({ user: req.user._id });
                const order = await Order.find({ user: user._id })
                    .populate('Purchase', '-_id')
                    .populate('Book', '-_id -__v -stock')
                    .populate('author', '-_id');
                res.status(200).json({ message: 'success', order: { ...order } });
            },
            500
        );
    },
};
