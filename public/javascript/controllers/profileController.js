(function() {
	'use strict';
	angular.module('app')
	.controller('profileController', profileController);

	profileController.$inject = ['HomeFactory','userFactory', 'profileFactory','$state','$modal'];

	function profileController( HomeFactory, userFactory, profileFactory, $state, $modal) {
		var vm = this;
		vm.user = {};
		vm.status = userFactory.status;
		vm.deleteBlog = deleteBlog;
		vm.logout = userFactory.logout;
		


//----------------------------------------------------------------------------------------------------------------------------------------------------//
// PROFILE>GET BLOGS BY USER ID
profileFactory.getBlogsUser().then(function(blog){
	vm.blogS = blog;
});

//----------------------------------------------------------------------------------------------------------------------------------------------------//
//PROFILE>DELETE
function deleteBlog(b) {
	profileFactory.deleteBlog(b).then(function(){
		// console.log("you made it back");
		profileFactory.getBlogsUser().then(function(blogs) {
			vm.blogS = blogs;
		});

	});
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//PROFILE>EDIT
vm.openEdit = function (b) {

	var instance = $modal.open({
		controller: 'editModalController',
		templateUrl: './../views/editBlog.html',
		resolve: {
			blog: function() {
				return b;
			}
		}
	});
	instance.result.then(function(editB) {
		profileFactory.editBlog(editB, b);
	}, function() {
		console.log("inside of the result");
	});
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------//
}
})();