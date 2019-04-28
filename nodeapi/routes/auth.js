const express = require('express');
const router = express.Router();

// validator
const { userSignupValidator } = require("../validator");

// controllers
const { signup, signin } = require('../controllers/auth');

router.post('/singup', userSignupValidator, signup);
router.post('/signin', signin);



module.exports = router;