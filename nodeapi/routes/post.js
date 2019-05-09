const express = require('express');
const router = express.Router();

// validator
const { createPostValidator } = require('../validator');

// authorization
const { requireSignin, isPoster } = require('../authorization');

// halpers
const { userById, postById } = require('../halpers');

// controllers
const {
  getPosts,
  createPost,
  postsByUser,
  deletePost,
  updatePost,
  postPhoto,
  singlePost
} = require('../controllers/post');

router.get('/posts', getPosts);
router.get('/post/:postId', singlePost);
router.post(
  '/post/new/:userId',
  requireSignin,
  createPost,
  createPostValidator
);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
// photo
router.get('/post/photo/:postId', postPhoto);

// param
router.param('userId', userById); // any route containing :userId, our app will first execute userById()
router.param('postId', postById); // any route containing :postById, our app will first execute postById()

module.exports = router;
