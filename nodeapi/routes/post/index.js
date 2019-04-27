const express = require('express');
const router = express.Router();

// controllers
const { getPosts, createPost } = require('../../controllers/post');

router.get('/', getPosts);
router.post('/post', createPost);


module.exports = router;