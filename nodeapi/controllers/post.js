const Post = require('../models/post');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');


// get all posts
exports.getPosts = (req, res) => {
    Post.find()
        .populate('postedBy', "_id name")
        .select("_id title body")
        .then((result) => {
            res.status(200).json({
                posts: result
            })
        })
        .catch((err) => {
            console.log(err);
        })
};

// create post
exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        };

        let post = new Post(fields);

        req.profile.salt = undefined;
        req.profile.hashed_password = undefined;

        post.postedBy = req.profile;
        if (files.photo) {
            post.photo.data = fs.readFileSync(req.photo.path);
            post.photo.contentType = files.photo.type;
        };

        post.save((err, result) => {
            if (err) {
                res.status(400).json({
                    err
                });
            };
            res.json(result);
        });
    });
};

// get all posts by user
exports.postsByUser = (req, res) => {
    Post.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id name")
        .sort("_created")
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(posts)
        });
};

// edit post
exports.updatePost = (req, res, next) => {
    let post = req.post;
    post = _.extend(post, req.body);
    post.updated = Date.now();
    post.save((err) => {
        if (err) {
            return res.status(400).json(err)
        }
        res.json(post);
    });
};

// delete post
exports.deletePost = (req, res) => {
    let post = req.post;

    post.remove((err, post) => {
        if (err) {
            res.status(400).json(err);
        }
        res.json({
            message: "Post deleted succesfully!"
        })
    });
};