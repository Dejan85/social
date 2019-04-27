const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: "Title is required",
        minlength: 4,
        maxlength: 150
    },
    body: {
        type: String,
        require: "Body is required",
        minlength: 4,
        maxlength: 2000
    }
});

module.exports = mongoose.model('Post', postSchema);