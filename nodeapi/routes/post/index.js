const express = require('express');
const router = express.Router();

// validator
const { createPostValidator } = require('../../validator');

// controllers
const { getPosts, createPost } = require('../../controllers/post');

router.get('/', getPosts);
router.post('/post', createPostValidator, createPost);


module.exports = router;