const express = require('express');
const router = express.Router();

// validator
const { userSignupValidator } = require("../validator");

// controllers
const { signup, signin, signout } = require('../controllers/auth');

// halpers
const { userById } = require('../halpers');

// route
router.post('/singup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

// param
router.param('userId', userById); // any route containing :userId, our app will first execute userById()


module.exports = router;