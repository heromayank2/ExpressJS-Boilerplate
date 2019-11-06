const mongoose = require("mongoose");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var adminSchema = new mongoose.Schema({
    id: String,
    hash: String,
    salt: String,
    changelog: Array
});

adminSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

adminSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};


adminSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        id: this.id,
        type: "admin",
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

adminSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        id: this.id,
        type: "admin",
        token: this.generateJWT()
    };
};

module.exports = mongoose.model("Admin", adminSchema);