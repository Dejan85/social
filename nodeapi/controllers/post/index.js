const Post = require('../../models/post');


exports.getPosts = (req, res) => {
    res.json({
        "post": "pusi kurac",
        "zasto": "zato"
    });
};

exports.createPost = (req, res) => {
    const post = new Post(req.body);

    post.save((err, result) => {
        if (err) {
            return res.status(400);
        }

        res.status(200).json({
            post: result
        })
    })
}

