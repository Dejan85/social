const User = require('../models/user');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');


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
exports.updateUser = (req, res, next) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            });
        }

        // save user
        let user = req.profile;
        user = _.extend(user, fields);
        user.updated = Date.now();

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }

            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        });
    });
};

// user photo
exports.userPhoto = (req, res, next) => {
    console.log('radi');
    if (req.profile.photo.data) {
        res.set(("Content-Type", req.profile.photo.contentType));
        return res.send(req.profile.photo.data);
    }
    next();
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
