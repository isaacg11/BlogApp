(function() {
	'use strict';
	angular.module('app')
	.controller('navBarController', navBarController);

	navBarController.$inject = ['userFactory', 'HomeFactory','$state','$window'];

	function navBarController(userFactory, HomeFactory, $state) {
		var vm = this;
		vm.user = {};
		vm.status = userFactory.status;
		vm.login = login;
		vm.deleteBlog = deleteBlog;
		vm.logout = userFactory.logout;
		// vm.deleteBlog = HomeFactory.deleteBlog;
		vm.blogS = HomeFactory.blogS;
//---------------------------------------------------------------------------LOGIN---------------------------------------------------------------------------------//
function login() {
	userFactory.login(vm.user).then(function(){
		$state.go('Profile');
	});
}
//-------------------------------------------------------------------PROFILE>GET BLOGS BY USER ID-------------------------------------------------------------------------//
// HomeFactory.getBlogsUser().then(function(blog){
// 	vm.blogS = blog;
// });

//------------------------------------------------------------------------PROFILE>DELETE-----------------------------------------------------------------------------//
function deleteBlog(b) {
	HomeFactory.deleteBlog(b).then(function(){
		HomeFactory.getBlogs();
	});
}



}
})();