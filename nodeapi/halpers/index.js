const User = require("../models/user");
const Post = require("../models/post");

// get user by id
exports.userById = (req, res, next, id) => {
<<<<<<< HEAD
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
=======
    User.findById(id)
        .populate("following", '_id name')
        .populate("followers", '_id name')
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User not found"
                });
            };
            req.profile = user;  // adds profile object in req with user info
            next();
        });
>>>>>>> 9b1021a9dd973fa91f7fe63d5a08b5670a0e974f
};

// post by id
exports.postById = (req, res, next, id) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 9b1021a9dd973fa91f7fe63d5a08b5670a0e974f
