(function() {
	'use strict';
	angular.module('app')
	.controller('editModalController', editModalController);

	editModalController.$inject = ['$modalInstance', '$scope', 'blog'];

	function editModalController($modalInstance, $scope, blog) {
		var vm = this;
		console.log(blog.description);
		$scope.blog = blog;
	// ------------------------------------------------------------------------------------------------------------------------------------------------------------------//
	// EDIT BLOG
	$scope.editBlog = function() {
		console.log('reached the editModalController');
		$modalInstance.close(vm.blog);
	//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

};
}
})();