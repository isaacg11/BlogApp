var express = require('express'); //imports express.
var router = express.Router();
var mongoose = require('mongoose'); //imports mongoose.
var blogModel = mongoose.model('blogModel'); //defines 'Comment.js' as a mongoose model.
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
router.post('/the/apiCall/Blog', function(req,res,next){ //this line activates when a post request is made to the 'post/apiCall/Comment' url.
	var createdBlog = new blogModel(req.body); // this line creates a variable 'createdComment' which is equal to the Schema configured request body;
	//Also uses the model 'Comment' to compare the Schema to the req.body and make matches the data configuration in the model. 
	createdBlog.dateCreated = new Date(); //this line take the newly configured req.body and gives it a property of dateCreated which is equal to new Date().
	//Also, new Date() is a built in method that uses the current date and assign it to the createdComment object.
	createdBlog.save(function(err, blog){ //this line uses the mongoose method 'save' to save the 'createdComment' to mongodb. (SERVER SIDE)
		console.log(blog); //this line says to console log the data.
		if(err) return next (err);
		res.send({id: blog._id}); //this line says to send the response with the id it was assigned in the HF back to THE CLIENT.
	});
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
	router.get('/the/apiCall/Blog', function(req,res, next) { //this line is a func. that runs when a get request is made at '/the/apiCall/Comment'.
		blogModel.find({}).exec(function(err,blog){ //this line says to connect to mongo, find all({}) data in the collection, and then execute the function.
			if (err) return next(err);
			res.send(blog); //this line says to send the response with 'dbcomments' data received from mongodb to THE CLIENT.
		});
	});
// //------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// router.param('comment', function(req,res,next,id){ //this line says to find the parameter with the name of 'comment'
// 	Comment.find({}).exec(function(err,comments){ //this line says to use the 'Comment' model and find the collection, and then execute the next function.
// 		if(err) return next (err); 
// 		req.comment = comments[0]; //this line places the 'comment' parameter on the request and makes it equal to 'comments' at the index of 1...????
// 		next(); //this line says to go to the parameter 'comment' with the newly configured data to use.
// 	});
// });
// //------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// router.post('/the/apiCall/deleteComment/:comment',function(req,res,next){
// 		Comment.update({_id:req.comment._id},{dateDeleted: new Date()}, function(err, numberAffected){ //this line uses the mongoose command .update to log the date deleted in mongodb.
// 			if(err) return next (err);
// 			if(numberAffected.nModified > 1)res.status(400).send('No More Comments To Delete'); //this line says that if the obj. collection of documents and the
// 			//number of modified documents within equals more than one, then return an error to the CLIENT SIDE. (numberAffected & nModified are mongoose commands)
// 			else if(numberAffected.nModified !==1)res.status(400).send('Nothing has been deleted'); //this line says that if the obj. collection of documents and the
// 			//number of modified documents within does not equal one, then return an error to the CLIENT SIDE. (numberAffected & nModified are mongoose commands)
// 			else res.send('Comment Deleted'); //this line says if no errors, send 'Comment Deleted' to the CLIENT SIDE.
// 		});
// //------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// });



module.exports = router;