const expressJwt = require("express-jwt");
require("dotenv").config();

exports.requireSignin = expressJwt({
  // if the token is valid, express jwt appends the verified users id
  // in and auth key to the request object
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});
