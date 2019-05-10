const User = require('../models/user');
const Post = require('../models/post');

// get user by id
exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'User not found'
        });
      }
      req.profile = user; // adds profile object in req with user info
      next();
    });
};

// post by id
exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name role')
    .select('_id title body created likes comments photo')
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: err
        });
      }
      req.post = post;
      next();
    });
};
