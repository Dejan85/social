const express = require('express');
const router = express.Router();

// validator
const { createPostValidator } = require('../validator');

// authorization
const { requireSignin } = require('../authorization');

// controllers
const { getPosts, createPost } = require('../controllers/post');

router.get('/', requireSignin, getPosts);
router.post('/post', createPostValidator, createPost);


module.exports = router;