const User = require('../models/user');

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