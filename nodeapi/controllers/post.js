const Post = require('../models/post');
const formidable = require('formidable');
const fs = require('fs');

// get all posts
exports.getPosts = (req, res) => {
    Post.find()
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




    const post = new Post(req.body);

    post.save()
        .then((result) => {
            res.status(200).json({
                post: result
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

