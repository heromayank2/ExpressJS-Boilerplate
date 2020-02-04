const mongoose = require("mongoose");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var nariSchema = new mongoose.Schema({
    name: String,
    age: Number,
    hash: String,
    salt: String,
    email: String,
    phone: Number,
    close_contacts:Array,
    last_loggedin: Date,
    last_location:{
        latitude:String,
        longitude:String
        // recorded_on:Date.now()
    },
    picture_url:String,
    points:Number,
    level:Number,
    activity_count:Array,
    dob:Date,
    articles:Array
});

nariSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

nariSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};


nariSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        type: "user",
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

nariSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        type: "user",
        token: this.generateJWT()
    };
};

module.exports = mongoose.model("Nari", nariSchema);