const express = require('express');
const router = express.Router();

// validator
const { userSignupValidator } = require("../validator");

// controllers
const { signup, signin, signout } = require('../controllers/auth');

router.post('/singup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);


module.exports = router;