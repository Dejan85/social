const expressJwt = require('express-jwt');
const dotenv = require('dotenv');
dotenv.config();


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET
})