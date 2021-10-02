const router = require('express').Router();

// router.use('/book', require('./routes/book.routes'));
router.use('/auth', require('./routes/user.routes'));

module.exports = router;
