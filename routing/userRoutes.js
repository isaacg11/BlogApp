var express = require('express'); //this line imports Express.
var mongoose = require('mongoose'); //this line imports Mongoose
var passport = require('passport'); //this line imports Passport
var User = mongoose.model('User'); 
var router = express.Router();
var jwt = require('express-jwt'); //this line imports the Express-jwt
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

router.post("/Register", function(req, res, next){ //this line activates the function when a user sends a post request to '/Register'.
	var user = new User(); //this line declares a variable 'user' equal to the object constructor 'new User()'; NOTE ---> 'User' is connected to the mongoose model.
	user.username = req.body.username; //this line declares a variable 'user.username' and makes it equal to the request body's username property (MONGODB)
	user.email = req.body.email; //this line declares a variable 'user.email' and makes it equal to the request body's email property. (MONGODB)
	user.setPassword(req.body.password); //this line says to set the password in mongodb equal to the request body's password property. (MONGODB)
	user.save(function(err,user){ //this line says to save the 'user' object to MONGODB.
		if(err) return next(err);
		res.json({token :user.generateJWT()}); //this line says to parsify the response with json and send the new JWT to THE CLIENT.
	});

});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
router.post('/Login', function(req, res, next) {
	console.log("reaching the route");
	if(!req.body.username || !req.body.password) return res.status(400).send("Please fill out every field");
	passport.authenticate('local', function(err, user, info) {
		if(err) return next(err);
		if(user) return res.json({token : user.generateJWT()});
		return res.status(400).send(info);
	})(req, res, next);
});

router.use(function(err, req, res, next) {
	res.status(500).send(err);
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
module.exports = router;