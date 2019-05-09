const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
