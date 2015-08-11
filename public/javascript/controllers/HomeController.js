(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['HomeFactory'];

	function HomeController(HomeFactory) {
		var vm = this;
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

		HomeFactory.getBlogs().then(function(res){
			vm.blogS = res;
		});



	}
})();