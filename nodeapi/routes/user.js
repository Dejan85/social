const express = require('express');
const router = express();

// halpers
const { userById } = require('../halpers');

// authorization
const { requireSignin } = require('../authorization')

// controllers
const { allUsers, getUser, updateUser } = require('../controllers/user');

// route
router.get('/user', allUsers)
router.get('/user/:userId', requireSignin, getUser)
router.put('/user/:userId', requireSignin, updateUser)

// param
router.param('userId', userById); // any route containing :userId, our app will first execute userById()

module.exports = router;