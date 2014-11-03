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

var ifpControllers = angular.module('ifpControllers',
    []);

ifpControllers.factory('ifpData', 
	['$http','$rootScope','$q',
	function($http,$rootScope,$q) {
	return {
		getUsers: function() {
			var promise =  $http.get('/user/getUsers').success(function(data) {	
		    	return data;
		  	});
		  	
		  	return promise;
		},
		getMenu: function(type) {
			var promise =  $http.get('/user/getMenu/'+type).success(function(data) {	
		    	return data;
		  	});
		  	
		  	return promise;
		}
	};
}]);

ifpControllers.controller('DefaultCtrl', 
	['$scope','$http','$rootScope','$location','users',
  	function($scope,$http,$rootScope,$location,users) {
  		$rootScope.actionMenu = [
  			{'label':'Add User','url':'#/create'}
  		];
  		
	    $scope.users = users.data;

}]);