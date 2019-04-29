const express = require('express');
const router = express.Router();

// validator
const { createPostValidator } = require('../validator');

// authorization
const { requireSignin } = require('../authorization');

// halpers
const { userById } = require('../halpers');

// controllers
const { getPosts, createPost, postsByUser } = require('../controllers/post');


router.get('/', getPosts);
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/post/by/:userId', requireSignin, postsByUser);



// param
router.param('userId', userById); // any route containing :userId, our app will first execute userById()

module.exports = router;