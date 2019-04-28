const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true
    },
    hashed_password: {
        type: String,
        trim: true,
        require: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

/**
* Virtual fields are additional fields for a given model.
* Their values can be set manuelly or automaticly with defined functionality.
* Keep in mind: virtual properities (password) don`t get persisted in the database.
* They only exist logiclly and are not written to the document`s collection
*/


// virtual field
userSchema.virtual('password')
    .set(function (password) {
        // create temporary variable called _password
        this._password = password;
        // generate a timestamp
        this.salt = uuidv1();
        // encryptePassword()
        this.hashed_password = this.encryptPassword(password);

    })
    .get(function () {
        return this._password;
    });

// methods
userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) {
            return "";
        }

        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return "";
        }
    }
}


module.exports = mongoose.model("User", userSchema);