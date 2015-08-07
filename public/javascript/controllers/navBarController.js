(function() {
	'use strict';
	angular.module('app')
	.controller('navbarCtrl', navBarController);

	navBarController.$inject = ['userFactory', '$state'];

	function navBarController(userFactory, $state) {
		var vm = this;
		vm.user = {};
		vm.status = userFactory.status;
		// vm.logout = userFactory.logout;
	}
})();