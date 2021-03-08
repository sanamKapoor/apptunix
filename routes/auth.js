const router = require('express').Router();
const { body } = require('express-validator');
const { signUp, login } = require('../controllers/auth');

router.post('/signup',
    body('name').trim().not().isEmpty().withMessage('Enter valid name'),
    body('email').isEmail().normalizeEmail().withMessage('Enter valid email'),
    body('password').trim().not().isEmpty().isLength({ min: 5 }).withMessage('Enter secure password'),
signUp);

router.post('/login',
    body('email').isEmail().normalizeEmail().withMessage('Enter valid email'),
    body('password').trim().not().isEmpty().isLength({ min: 5 }).withMessage('Enter secure password'),
login);

module.exports = router;