(function() {
	'use strict';
	angular.module('app')
	.controller('navBarController', navBarController);

	navBarController.$inject = ['userFactory', 'HomeFactory','$state','$modal'];

	function navBarController(userFactory, HomeFactory, $state,$modal) {
		var vm = this;
		vm.user = {};
		vm.status = userFactory.status;
		vm.login = login;
		vm.deleteBlog = deleteBlog;
		vm.logout = userFactory.logout;
		vm.blogS = HomeFactory.blogS;
//-----------------------------------------------------------------------------------------------------------------------------------------------------------//
//LOGIN
function login() {
	userFactory.login(vm.user).then(function(){
		$state.go('Profile');
	});
}
//--------------------------------------------------------------------------------------------------------------------------------------------//
// PROFILE>GET BLOGS BY USER ID
HomeFactory.getBlogsUser().then(function(blog){
	vm.blogS.user = blog;
});

//----------------------------------------------------------------------------------------------------------------------------------------------------//
//PROFILE>DELETE
function deleteBlog(b) {
	HomeFactory.deleteBlog(b).then(function(){
		HomeFactory.getBlogs();
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
		HomeFactory.editBlog(editB, b);
	}, function() {
		console.log("inside of the result");
	});
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------//
}
})();