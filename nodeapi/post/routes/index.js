const express = require("express");
const router = express.Router();

const { createPostValidator } = require("../validator");
const {
  postById,
  getPost,
  createPost,
  postsByUser,
  deletePost,
  updatePost
} = require("../controllers");
const { isPoster } = require("../authorization");
const { userById } = require("../../user/controllers");
const { requireSignin } = require("../../login/autorization");

router.get("/post", requireSignin, getPost);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);
router.get("/posts/by/:userId", postsByUser);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);

// any route containing :userId, our app will first execute userById()
router.param("userId", userById);
// any route containing :postById, our app will first execute postById()
router.param("postId", postById);

module.exports = router;
