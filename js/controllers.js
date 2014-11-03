var ctrlRoutes = function ctrlRoutes($routeProvider) {
	$routeProvider.
		when('/', {
	        templateUrl: '/partials/floor-plan-display.html',
	        controller: 'DefaultCtrl'/*,
	        resolve: {
	        	users: function(ifpData){
	        		return ifpData.getUsers();
	        	}
	        }*/
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
	['$scope','$http','$rootScope','$location',
  	function($scope,$http,$rootScope,$location) {
  		$rootScope.actionMenu = [
  			{'label':'Add User','url':'#/create'}
  		];
  		
	    //$scope.users = users.data;

}]);