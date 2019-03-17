const express = require("express");
const router = express.Router();
const {
  userRegister,
  login,
  logout,
  updateUser,
  userPhoto
} = require("../controllers");
const { userById } = require("../../user/controllers");
const { userSignupValidator } = require("../validator");

router.post("/signup", userSignupValidator, userRegister);
router.post("/login", login);
router.get("/logout", logout);
router.put("/user/:userId", updateUser);

// photo
router.get("user/photo/:userId", userPhoto);

// any route containing :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;
