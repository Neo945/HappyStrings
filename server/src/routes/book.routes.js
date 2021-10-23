const router = require('express').Router();
const view = require('../controllers/book.controller');

router.get('/top', view.getTopBooks);
router.get('/all', view.getAllBooks);
router.get('/:id', view.getBook);
router.get('/ava', view.getAvailableBook);
router.get('/author', view.getAurthorBooks);
router.get('/all/author', view.getAuthor);
router.get('/cat', view.getCategoryBooks);
router.get('/search/:page', view.getSearchBooks);
router.post('/create', view.createBook);

module.exports = router;
