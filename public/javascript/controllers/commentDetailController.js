
(function() {
	'use strict';
	angular.module('app')
	.controller('commentDetailController', commentDetailController);

	commentDetailController.$inject = ['HomeFactory', '$state', '$stateParams'];

	function commentDetailController(HomeFactory, $state, $stateParams) {
		var vm = this;
		vm.comment = {};
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//GET STATEPARAMS ID
if($stateParams.id) {
	HomeFactory.getBlogID($stateParams.id).then(function(res){
		vm.blog = res;
	});
}
else $state.go('Comment');
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//CREATE COMMENT

		//$stateParams.id holds the id of the task
		//we need to add the comment to a specific task
		vm.createComment = function() {
			HomeFactory.createComment($stateParams.id, vm.comment).then(function(res) {
				vm.comment._id = res._id;
				vm.comment.dateCreated = res.dateCreated;
				vm.blog.comments.push(vm.comment);
				vm.comment = {};
			});
		};
	}
})();