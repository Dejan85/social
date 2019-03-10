module.exports = db = MONGO_URI => {
  const mongoose = require("mongoose");
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true
    })
    .then(() => {
      console.log("Mongo connected");
    })
    .catch(err => {
      console.log(err.errmsg);
    });
};
