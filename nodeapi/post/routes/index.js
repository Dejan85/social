const express = require("express");
const router = express.Router();

const { createPostValidator } = require("../validator");
const { getPost, createPost, postsByUser } = require("../controllers");
const { userById } = require("../../user/controllers");
const { requireSignin } = require("../../login/autorization");

router.get("/get", requireSignin, getPost);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);
router.get("/posts/by/:userId", postsByUser);

// any route containing :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;
