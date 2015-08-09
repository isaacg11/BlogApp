(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['HomeFactory'];

	function HomeController(HomeFactory) {
		var vm = this;
		vm.blogS = HomeFactory.blogS; //this line declares a variable which will be equal to the array holding the data obj. 
		// vm.deleteComment = HomeFactory.deleteComment; //this line declares a variable which will be equal to the 'deleteComment()' function in the HF.
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
	}
})();