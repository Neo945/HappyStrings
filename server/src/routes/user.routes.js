const router = require('express').Router();
const view = require('../controllers/user.controllers');
const isa = require('../middlewares/authCheck.middleware');
const passport = require('../config/passport.config');

router.get('/get', view.getUser);
router.post('/register', view.registerUser);
router.post('/create', view.createUserForBaseUser);
router.post('/login', view.login);
router.get('/logout', isa, view.logout);
router.post('/email', view.sendEmailVerfication);
router.post('/email/verify', view.verifyEmailToken);

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);
router.get('/google/redirect', passport.authenticate('google'), view.googleOauthRedirect);

module.exports = router;
