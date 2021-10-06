const router = require('express').Router();
const view = require('../controllers/book.controller');

router.get('/top', view.getTopBooks);
router.get('/all', view.getAllBooks);
router.get('/:id', view.getBook);
router.get('/ava', view.getAvailableBook);
router.get('/author', view.getAurthorBooks);
router.get('/cat', view.getCategoryBooks);
router.get('/search', view.getSearchBooks);
router.post('/create/:page', view.createBook);

module.exports = router;
