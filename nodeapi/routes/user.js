const express = require('express');
const router = express();

// halpers
const { userById } = require('../halpers');

// controllers
const { allUsers } = require('../controllers/user');

// route
router.get('/user', allUsers)

// param
router.param('userId', userById); // any route containing :userId, our app will first execute userById()

module.exports = router;