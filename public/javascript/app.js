(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//PAGE CONFIGURATION
$stateProvider.state('Home',{
	url: '/',
	templateUrl: 'views/home.html'
});
$urlRouterProvider.otherwise('/');
}
})();
