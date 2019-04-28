const Post = require('../models/post');


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

exports.createPost = (req, res) => {
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

