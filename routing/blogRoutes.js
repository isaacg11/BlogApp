var express = require('express'); //imports express.
var router = express.Router();
var mongoose = require('mongoose'); //imports mongoose.
var blogModel = mongoose.model('blogModel'); //defines 'Comment.js' as a mongoose model.
var jwt = require('express-jwt');
var auth = jwt({secret: 'Hashbrowns', userProperty: 'payload'});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// // EDIT BLOG
// router.post('/:blog', function(req, res, next) {
// 	blogModel.update({_id : req.blog._id}, req.body, {multi: false}, function callback(err, numAffected) {
// 		if(err) return next(err);
// 		else if (numAffected.nModified > 1) res.status(400).send("TOO MANY TODOS UPDATED!!!!");
// 		else if (numAffected.nModified !== 1) res.status(400).send("No todos updated");
// 		else res.status(200).send("Good to go!");
// 	});
// });
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//ADD BLOG
router.post('/the/apiCall/Blog', auth, function(req,res,next){ //this line activates when a post request is made to the 'post/apiCall/Comment' url.
	var createdBlog = new blogModel(req.body); // this line creates a variable 'createdComment' which is equal to the Schema configured request body;
	//Also uses the model 'Comment' to compare the Schema to the req.body and make matches the data configuration in the model. 
	createdBlog.dateCreated = new Date(); //this line take the newly configured req.body and gives it a property of dateCreated which is equal to new Date().
	//Also, new Date() is a built in method that uses the current date and assign it to the createdComment object.
	createdBlog.user = req.payload.id;
	createdBlog.save(function(err, blog){
	 //this line uses the mongoose method 'save' to save the 'createdComment' to mongodb. (SERVER SIDE)
		// console.log(blog); //this line says to console log the data.
		if(err) return next (err);
		res.send({id: blog._id}); //this line says to send the response with the id it was assigned in the HF back to THE CLIENT.
	});
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// GET ALL BLOGS (PUBLIC)
	router.get('/the/apiCall/Blog', function(req,res, next) { //this line is a func. that runs when a get request is made at '/the/apiCall/Comment'.
		blogModel.find({dateDeleted: null}).populate('user', 'username _id')
		.exec(function(err,blogs){ //this line says to connect to mongo, find all({}) data in the collection, and then execute the function.
			if (err) return next(err);
			console.log("executing");
			res.send(blogs); //this line says to send the response with 'dbcomments' data received from mongodb to THE CLIENT.
		});
	});
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// DEFINE 'USER' PARAMETER 
router.param('user', function(req,res,next,id){ //this line says to find the parameter with the name of 'comment'
	blogModel.find({_id: id}).exec(function(err, blogs){ //this line says to use the 'Comment' model and find the collection, and then execute the next function.
		if(err) return next (err); 
		req.blogs = blogs[0]; //this line places the 'comment' parameter on the request and makes it equal to 'comments' at the index of 1...????
		next(); //this line says to go to the parameter 'comment' with the newly configured data to use.
	});
});
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// GET BLOG BY SIGNED IN USER ID
router.get('/the/apiCall/BlogUser/blog', auth, function(req,res, next) {
	console.log(req.payload.id);
	blogModel.find({user: req.payload.id, dateDeleted: null}).exec(function(err, blogs){
		if(err) return next (err);
		res.send(blogs);
	});
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//DEFINES 'BLOG' PARAMETER
router.param('blog', function(req,res,next,id){ 
	blogModel.find({_id: id}).populate('blogs.user','username').exec(function(err,blogs) { 
		if(err) return next (err); 
		req.blog = blogs[0]; 
		next(); 
	});
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//DELETE BLOG
router.post('/the/apiCall/deleteBlog/:blog',function(req,res,next){
		blogModel.update({_id: req.blog._id},{dateDeleted: new Date()}, function(err, numberAffected){ //this line uses the mongoose command .update to log the date deleted in mongodb.
			if(err) return next (err);
			if(numberAffected.nModified > 1)res.status(400).send('No More Blogs To Delete'); //this line says that if the obj. collection of documents and the
			//number of modified documents within equals more than one, then return an error to the CLIENT SIDE. (numberAffected & nModified are mongoose commands)
			else if(numberAffected.nModified !==1)res.status(400).send('Nothing has been deleted'); //this line says that if the obj. collection of documents and the
			//number of modified documents within does not equal one, then return an error to the CLIENT SIDE. (numberAffected & nModified are mongoose commands)
			else res.send('Blog Deleted'); //this line says if no errors, send 'Comment Deleted' to the CLIENT SIDE.
		});
	});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//GETS A SINGLE BLOG FOR COMMENT FUNCTION
router.get('/the/apiCall/Blog/:blog', function(req, res, next) {
	res.send(req.blog);
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//POST COMMENT
router.post('/the/apiCall/Blog/:blog/comment', auth, function(req, res, next) {
	console.log("reached the route");
	var newComment = req.body;
	newComment.dateCreated = new Date();
	console.log(req.payload);
	newComment.user = req.payload.id;
	blogModel.update({_id: req.blog._id}, {$push: { comments: newComment }}, function(err, numberAffected) {
		if(err) return next(err);
		blogModel.findOne({_id: req.blog._id}, function(err, blog) {
			if(err) return next(err);
			var comment = blog.comments[blog.comments.length - 1];
			res.send({_id: comment._id, dateCreated: comment.dateCreated});
		});
	});
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
module.exports = router;