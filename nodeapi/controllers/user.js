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
            res.json({
                users
            });
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
        console.log('radi');

        if (err) {
            return res.status(400).json({
                error: "You are not authorized to preform this action"
            });
        };

        user.salt = undefined;
        user.hashed_password = undefined;

        console.log(user);
        res.json({
            user
        });
    });
};
