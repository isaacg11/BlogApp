(function() {
	'use strict';
	angular.module('app')
	.controller('navBarController', navBarController);

	navBarController.$inject = ['userFactory', 'HomeFactory','$state'];

	function navBarController(userFactory, HomeFactory, $state) {
		var vm = this;
		vm.user = {};
		vm.status = userFactory.status;
		vm.login = login;
		vm.logout = userFactory.logout;
		vm.blogS = [];
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function login() {
	userFactory.login(vm.user).then(function(){
		$state.go('Profile');
	});
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
HomeFactory.getBlogs().then(function(blog){
	vm.blogS = blog;
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
}
})();