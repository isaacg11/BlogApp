
(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {}; // this is an empty object that will take all the functions and put them in the obj. "o" 
		o.blogS = []; //this is an empty array
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

		o.postBlog = function(blog){ //this line is a function that uses the data passed from the createCommentController and puts it in the parameter.
			var q = $q.defer(); //this line creates a variable called 'q' which holds $q.defer().
			$http.post('/the/apiCall/Blog', blog).success(function(res){ //this line says if the post request is successful TO THE SERVER to run the func., but not error().
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

o.getBlogs = function(){ 
	var q = $q.defer();
			$http.get('/the/apiCall/Blog').success(function(res){ //this line sends a get request to '/the/apiCall/Comment'. 
				q.resolve(res);
			});
			return q.promise; //this line turns the function call in the cCController into an object and to activate when the q.whatever method is used.
		};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// o.getBlogsUser = function(userId, blog) {
// 	var q = $q.defer();
// 	$http.get('/the/apiCall/BlogUser/' + userId + '/blog', blog, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).success(function(res) {
// 		blog.user = {};
// 		blog.user.username = JSON.parse(atob(localStorage['token'].split('.')[1])).username;
// 		q.resolve(res);
// 	});
// 	return q.promise;
// };
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//DELETE POST CALL
o.deleteBlog = function(blog){ 
	alert("Are you sure you want to remove this blog?");
	var q = $q.defer();
	$http.post('/the/apiCall/deleteBlog/' + blog._id).success(function(res){ 
		o.blogS.splice(o.blogS.indexOf(blog), 1);
		q.resolve();
	});
	return q.promise; 
};
// //------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		return o; //this line says to take all the functions in the obj 'o' and then inject them into the HF for use in the controllers.
	}
})();