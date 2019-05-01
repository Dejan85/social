const User = require('../models/user');
const _ = require('lodash');


// get all users
exports.allUsers = (req, res) => {
    User.find()
        .select("_id name email")
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            };
            res.json(users);
        });
};

// getUser
exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
};

// edit user
exports.updateUser = (req, res) => {
    let user = req.profile;
    user = _.extend(user, req.body); // extend - mutate the source object
    user.updated = Date.now();
    user.save((err) => {
        if (err) {
            return res.status(400).json({
                error: "You are not authorized to preform this action"
            });
        };

        user.salt = undefined;
        user.hashed_password = undefined;

        res.json({
            user
        });
    });
};

// delete user 
exports.deleteUser = (req, res) => {
    let user = req.profile;
    user.remove((err, user) => {
        if (err) {
            res.status(400).json({
                err
            });
        };

        user.salt = undefined;
        user.hashed_password = undefined;

        res.json({
            message: `User deleted successfuly!`
        });
    });
};
