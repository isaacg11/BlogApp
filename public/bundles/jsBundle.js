(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//LOGIN
$stateProvider.state('Home',{
	url: '/',
	templateUrl: 'views/Home.html'
}).
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//REGISTER
state('Register', {
	url:'/Register',
	templateUrl: 'views/register.html'
}).
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//PROFILE
state('Profile', {
	url:'/Profile',
	templateUrl: 'views/profile.html'
}).
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//ADD BLOG
state('Add', {
	url:'/Add',
	templateUrl: 'views/addBlog.html'
}).
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//EDIT BLOG
state('Edit', {
	url:'/Edit',
	templateUrl: 'views/editBlog.html'
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$urlRouterProvider.otherwise('/');
}
})();

(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = [];

	function HomeController() {
		var vm = this;
		vm.title = 'Welcome to our App!';
	}
})();

(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};
		
		return o;
	}
})();