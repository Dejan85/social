const express = require('express');
const router = express.Router();

// validator
const { userSignupValidator } = require("../validator");

// controllers
const { signup } = require('../controllers/auth');

router.post('/singup', userSignupValidator, signup);



module.exports = router;