(function() {
	'use strict';
	angular.module('app')
	.controller('addBlogController', addBlogController);

	addBlogController.$inject = ['HomeFactory','$state'];

	function addBlogController(HomeFactory,$state) {
		var vm = this; 
		var blog = {}; 
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

		vm.addBlog = function() { //this line is a function that takes input from the createComment.html page through 'vm' databinding.
			HomeFactory.postBlog(vm.blog).then(function(){ //this line says to activate 'postComment()'' func. in the HF and pass the data in the 'comment' obj.
				$state.go('Public'); // line says that once the 'postComment()' is done to go to the 'Home' state in app.js.
			});
		};
	}
})();