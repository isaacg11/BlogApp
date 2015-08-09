(function() {
	'use strict';
	angular.module('app')
	.controller('navBarController', navBarController);

	navBarController.$inject = ['userFactory', 'HomeFactory','$state','$window'];

	function navBarController(userFactory, HomeFactory, $state, $window) {
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

//---------------------------------------------------------------------PROFILE>GET ALL BLOGS--------------------------------------------------------------------------//
// HomeFactory.getBlogs().then(function(data){
// 	vm.blogS = data;
// });
//------------------------------------------------------------------------PROFILE>DELETE-----------------------------------------------------------------------------//
function deleteBlog(b) {
	console.log('reached the controller');
	HomeFactory.deleteBlog(b).then(function(){
		$state.go('Profile');
		HomeFactory.getBlogs();
	});
}



}
})();