(function() {
	'use strict';
	angular.module('app')
	.factory('profileFactory', profileFactory);

	profileFactory.$inject = ['$http', '$q'];

	function profileFactory($http, $q) {
		var o = {}; 
		o.blogS = [];
		var authToken = {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//DELETE BLOG
o.deleteBlog = function(blog){ 
	alert("Are you sure you want to remove this blog?");
	var q = $q.defer();
	$http.post('/the/apiCall/deleteBlog/' + blog._id).success(function(res){ 
		o.blogS.splice(o.blogS.indexOf(blog), 1);
		q.resolve();
	});
	return q.promise; 
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// EDIT BLOG
o.editBlog = function(editB, b) {
	$http.put('/the/apiCall/EditBlog' + b._id).success(function(data){
		o.blogS[o.blogS.indexOf(b)] = angular.copy(editB);
	});
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// GET BLOGS BY USER ID
o.getBlogsUser = function() {
	var q = $q.defer();
	$http.get('/the/apiCall/BlogUser/blog', authToken).success(function(blogs) {
		blogs.user = {};
		blogs.user.username = JSON.parse(atob(localStorage['token'].split('.')[1])).username;
		q.resolve(blogs);
	});
	return q.promise;
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
	return o; //this line says to take all the functions in the obj 'o' and then inject them into the HF for use in the controllers.
	
}}());