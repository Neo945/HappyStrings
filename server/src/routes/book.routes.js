const router = require('express').Router();
const view = require('../controllers/book.controller');

router.get('/', view.test);

module.exports = router;
