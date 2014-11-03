var ctrlRoutes = function ctrlRoutes($routeProvider) {
	$routeProvider.
		when('/', {
	        templateUrl: '/angular-views/user.html',
	        controller: 'UserCtrl',
	        resolve: {
	        	users: function(liuUserData){
	        		return liuUserData.getUsers();
	        	}
	        }
		}).
		when('/create', {
	        templateUrl: '/angular-views/user-form.html',
	        controller: 'UserFormCtrl'
		}).
	    otherwise({
	        redirectTo: '/'
	    });  
};