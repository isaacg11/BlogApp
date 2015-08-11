(function() {
	'use strict';
	angular.module('app')
	.factory('addBlogFactory', addBlogFactory);

	addBlogFactory.$inject = ['$http', '$q'];

	function addBlogFactory($http, $q) {
		var o = {}; // this is an empty object that will take all the functions and put them in the obj. "o" 
		o.blogS = [];
		var authToken = {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}};
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		//POST BLOG
		o.postBlog = function(blog){ //this line is a function that uses the data passed from the createCommentController and puts it in the parameter.
			var q = $q.defer(); //this line creates a variable called 'q' which holds $q.defer().
			$http.post('/the/apiCall/Blog', blog, authToken).success(function(res){
				 //this line says if the post request is successful TO THE SERVER to run the func., but not error().
				blog._id = res.id; //this line will give the comment data an id as a response to the CLIENT SIDE.
				blog.dateCreated = new Date(); //this line takes the data, assigns it a property of dateCreated, and uses the new Date() method to insert the current date. (CLIENT SIDE)
				o.blogS.push(blog); //this line pushes the data from 'comment' and puts in the empty array 'comments' that can be used on the CLIENT SIDE.
				q.resolve(); // this line says to go back to the cCController and activate the first property '.then'.
			}).error(function(res){ //this line says that if there is an error to run the function.
				q.reject(res); //this line says to run the 2nd property in the cCController (usually an error notification)
			});
			return q.promise; //this line turns the function call in the cCController into an object and to activate when the q.whatever method is used.
		};
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		return o;

	}
})();