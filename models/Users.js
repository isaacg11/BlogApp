var mongoose = require('mongoose'); //this line imports Mongoose
var crypto = require('crypto'); //this line imports crypto
var jwt = require('jsonwebtoken'); //this line imports jsonwebtoken

var UserSchema = new mongoose.Schema({ //this line declares a variable 'UserSchema' equal to the object constructor 'mongoose.Schema'.
	username: {type: String, lowercase: true, unique: true}, //this line is a property 'username' which key value is formatted according to the mongodb Schema.
	email: {type: String, unique: true, lowercase: true}, //this line is a property 'email' which key value is formatted according to the mongodb Schema.
	passwordHash: String, //this line is a property 'passwordHash' which key value is equal to a string.
	salt: String //this line is a property 'salt' which key value is equal to a string.
});

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex'); 
	this.passwordHash =crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return (hash === this.passwordHash);
};

UserSchema.methods.generateJWT = function() {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 36500); //expires in 100 years (365 days * 100 years);
	return jwt.sign({
		id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000) //get the time in milliseconds and convert to seconds
	}, 'Hashbrowns');
};
mongoose.model('User', UserSchema); //this line declares the mongoose model's name to be "User" and to use the 'UserSchema' as the schematics for the model.