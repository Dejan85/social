const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


// create new user
exports.signup = async (req, res) => {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
        return res.status(403).json({ error: 'Email is taken!' })
    };

    const user = await new User(req.body);
    await user.save();
    res.status(200).json({
        message: "Signup success! Please login."
    });
};

// user login
exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {

        // if err or no user
        if (err || !user) {
            return res.status(401).json({
                error: "User with that email does not exists. Please signin"
            })
        }

        // if user, authenticate
        // if user is found make sure the email and password match
        // create authenticate method in model and use here
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "User with that email does not exists. Please signin"
            })
        }

        // generate a token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        // persist the token as 't' in cookie with expire date
        res.cookie("t", token, { expire: new Date() + 9999 });

        // return response with user and token to frontend client
        const { _id, name, email } = user;
        return res.json({ token, user: { _id, name, email } });
    })

}

// user logout
exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.json({
        message: "Signout success!"
    });
}

