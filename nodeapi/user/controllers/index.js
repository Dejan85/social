const User = require("../../login/models/user");
const _ = require("lodash");

// get user by id
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    req.profile = user; // adds profile object in req with user info
    next();
  });
};

// get all users
exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(400).json({
        error: err
      });
    }
    res.json(users);
  }).select("name email updated created");
};

// get one user
exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// update user
exports.updateUser = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body); // extend - mutate the source object
  user.updated = Date.now();
  user.save(err => {
    if (err) {
      res.status(400).json({
        error: "You are not authorized to perform this action"
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ user });
  });
};

// delete user
exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ message: "User deleted successfuly" });
  });
};
