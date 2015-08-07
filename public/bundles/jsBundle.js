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
}).
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//PUBLIC BLOGS
state('Public', {
	url:'/Public',
	templateUrl: 'views/public.html'
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$urlRouterProvider.otherwise('/');
}
})();

(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['HomeFactory'];

	function HomeController(HomeFactory) {
		var vm = this;
		vm.blogS = []; //this line declares a variable which will be equal to the array holding the data obj. 
		// vm.deleteComment = HomeFactory.deleteComment; //this line declares a variable which will be equal to the 'deleteComment()' function in the HF.
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		HomeFactory.getBlogs().then(function(blog){
			vm.blogS = blog;
		});
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
	}
})();
(function() {
	'use strict';
	angular.module('app')
	.controller('addBlogController', addBlogController);

	addBlogController.$inject = ['HomeFactory','$state'];

	function addBlogController(HomeFactory,$state) {
		var vm = this; 
		var blog = {}; 
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

		vm.addBlog = function() { //this line is a function that takes input from the createComment.html page through 'vm' databinding.
			HomeFactory.postBlog(vm.blog).then(function(){ //this line says to activate 'postComment()'' func. in the HF and pass the data in the 'comment' obj.
				$state.go('Public'); // line says that once the 'postComment()' is done to go to the 'Home' state in app.js.
			});
		};
	}
})();
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
		vm.logout = userFactory.logout;
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function login() {
	userFactory.login(vm.user).then(function(){
		$state.go('Profile');
	});
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//



}
})();

(function() {
	'use strict';
	angular.module('app')
	.controller('registerController', registerController);

	registerController.$inject = ["userFactory","$state"];

	function registerController(userFactory,$state) {
		var vm = this; 
		vm.user = {}; //this line is declaring a variable 'nav.user' equal to an empty obj.
		vm.status = userFactory.status; //this line is declaring a variable 'vm.status' equal to 'userFactory.status'
		vm.register = register; //this line is declaring a variable 'nav.register' equal to 'register'.
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function register() {
	var u = vm.user; //this line is declaring a variable 'user' equal to an empty object.
	if(!u.username || !u.email || !u.password || !u.cpassword || !(u.password === u.cpassword )) { //this line is saying if none of the expressions are
		return false; //true, then to return false to THE CLIENT.
	}
	userFactory.register(u).then(function(){ //this line says to go to the HF and activate the function 'register' by passing the data obj.'user' in the parameter.
		$state.go('Profile');//this line says that once the function is complete, go back and render the 'Profile' state.
	});
}



}
})();

(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {}; // this is an empty object that will take all the functions and put them in the obj. "o" 
		o.blogS = []; //this is an empty array
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

		o.postBlog = function(blog){ //this line is a function that uses the data passed from the createCommentController and puts it in the parameter.
			var q = $q.defer(); //this line creates a variable called 'q' which holds $q.defer().
			$http.post('/the/apiCall/Blog', blog).success(function(res){ //this line says if the post request is successful TO THE SERVER to run the func., but not error().
				blog._id = res.id; //this line will give the comment data an id as a response to the CLIENT SIDE.
				blog.dateCreated = new Date(); //this line takes the data, assigns it a property of dateCreated, and uses the new Date() method to insert the current date. (CLIENT SIDE)
				o.blogS.push(blog); //this line pushes the data from 'comment' and puts in the empty array 'comments' that can be used on the CLIENT SIDE.
				q.resolve(); // this line says to go back to the cCController and activate the first property '.then'.
			}).error(function(res){ //this line says that if there is an error to run the function.
				q.reject(res); //this line says to run the 2nd property in the cCController (usually an error notification)
			});
			return q.promise; //this line turns the function call in the cCController into an object and to activate when the q.whatever method is used.
		};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

o.getBlogs = function(){ 
	var q = $q.defer();
			$http.get('/the/apiCall/Blog').success(function(res){ //this line sends a get request to '/the/apiCall/Comment'. 
				q.resolve(res);
			});
			return q.promise; //this line turns the function call in the cCController into an object and to activate when the q.whatever method is used.
		};
// //------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// o.deleteComment = function(comment){ 
// 			$http.post('/the/apiCall/deleteComment/' + comment._id).success(function(res){ //this line sends a post request to '/the/apiCall/deleteComment/'+commentID to SERVER SIDE.
// 				o.comments.splice(o.comments.indexOf(comment), 1);//this line takes the comments array obj. and splices the array obj. at the index of 'comment', 1 (CLIENT SIDE)
// 			}); 
// 		};
// //------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		return o; //this line says to take all the functions in the obj 'o' and then inject them into the HF for use in the controllers.
	}
})();
(function() {
	'use strict';
	angular.module('app')
	.factory('userFactory', userFactory);

	userFactory.$inject = ['$http', '$q', '$state'];

	function userFactory($http, $q, $state) {
		var o = {};
		o.status = {};
		if(getToken()) {
			o.status.isLoggedIn = true;
			o.status.username = getUsername();
		}
		o.setToken = setToken;
		o.getToken = getToken;
		o.removeToken = removeToken;
		o.register = register;
		o.login = login;
		o.logout = logout;
		return o;
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		function register(user) {
			var q = $q.defer();
			$http.post('/api/Users/Register', user).success(function(res){ //this line says to send a post request to '/api/Users/Register' with the data obj. 'user' to THE SERVER.
				setToken(res.token); // this line says to set the authentication token on the response obj. and assign it the property name of 'token'.
				o.status.isLoggedIn = true; //this line says to make the status of the user to 'isLoggedIn' equal to true.
				q.resolve(); //this line says to go back to the navBarController and activate the first property '.then'.
			}).error(function(res) {
				console.error(res);
			});
			return q.promise; //this line turns the function call in the navBarController into an object and to activate when the q.whatever method is used.
		}
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		function login(user) {
			var u = { username: user.username.toLowerCase(), password: user.password};
			var q = $q.defer();
			$http.post('/api/Users/Login', u).success(function(res) {
				setToken(res.token);
				o.status.isLoggedIn = true;
				q.resolve();
			});
			return q.promise;
		}
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		function logout() {
			console.log("reached the factory");
			o.status.isLoggedIn = false;
			removeToken();
		}
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		function setToken(token){
			localStorage.setItem('token', token);
			o.status.username = getUsername();
		}
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		function getToken() {
			return localStorage['token'];
		}
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//function getUsername() {
			function removeToken() {
				localStorage.removeItem('token');
				o.status.username = null;
			}
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		function getUsername() {
			return JSON.parse(atob(getToken().split('.')[1])).username;
		}
	}
})();