(function() {
	'use strict';
	angular.module('app')
	.controller('navBarController', navBarController);

	navBarController.$inject = ['userFactory', '$state'];

	function navBarController(userFactory, $state) {
		var vm = this;
		vm.user = {};
		vm.status = userFactory.status;
		vm.login = login;
		// vm.logout = userFactory.logout;
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function login() {
	userFactory.login(vm.user).then(function(){
		$state.go('Profile');
	});
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

}
})();