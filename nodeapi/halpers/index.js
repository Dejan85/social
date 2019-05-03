const User = require("../models/user");
const Post = require("../models/post");

// get user by id
exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, user) => {
      if (err || !user) {
        console.log(err.message);
        return res.status(400).json({
          error: "User not found"
        });
      }
      req.profile = user; // adds profile object in req with user info
      next();
    });
};

// post by id
exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
      if (err || !post) {
        res.status(400).json({
          err
        });
      }
      req.post = post;
      next();
    });
};
