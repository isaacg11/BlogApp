(function() {
	'use strict';
	angular.module('app')
	.controller('navBarController', navBarController);

	navBarController.$inject = ['profileFactory','userFactory','$state'];

	function navBarController(profileFactory, userFactory, $state) {
		var vm = this;
		vm.user = {};
		vm.status = userFactory.status;
		vm.login = login;
		// vm.deleteBlog = deleteBlog;
		vm.logout = logout;
		// vm.blogS = HomeFactory.blogS;
		vm.register = register;
//-----------------------------------------------------------------------------------------------------------------------------------------------------------//
//LOGIN
function login() {
	userFactory.login(vm.user).then(function(){
		$state.go('Profile');
	});
}
//--------------------------------------------------------------------------------------------------------------------------------------------//
function register() {
	var u = vm.user; //this line is declaring a variable 'user' equal to an empty object.
	if(!u.username || !u.email || !u.password || !u.cpassword || !(u.password === u.cpassword )) { //this line is saying if none of the expressions are
		return false; //true, then to return false to THE CLIENT.
	}
	userFactory.register(u).then(function(){ //this line says to go to the HF and activate the function 'register' by passing the data obj.'user' in the parameter.
		$state.go('Profile');//this line says that once the function is complete, go back and render the 'Profile' state.
	});
}
//--------------------------------------------------------------------------------------------------------------------------------------------//
function logout () {
	// profileFactory.blogS.length = 0;
	userFactory.logout();
}





//-----------------------------------------------------------------------------------------------------------------------------------------------------//
}
})();