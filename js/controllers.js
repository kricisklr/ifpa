var ctrlRoutes = function ctrlRoutes($routeProvider) {
	$routeProvider.
		when('/:elevation', {
	        templateUrl: '/partials/floor-plan-display.html',
	        controller: 'DefaultCtrl',
	        resolve: {
	        	elevations: function(ifpData){
	        		return ifpData.getFloorPlans();
	        	}
	        }
		}).
	    otherwise({
	        redirectTo: '/:elevation'
	    });  
};

var ifpControllers = angular.module('ifpControllers',
    ['ifpDirectives']);

ifpControllers.factory('ifpData', 
	['$http','$rootScope','$q',
	function($http,$rootScope,$q) {
	return {
		getFloorPlans: function(elevation) {
			if(typeof elevation == 'undefined'){
				elevation = 0;
			}
			var promise =  $http.get('/ifp.php?elevation='+elevation).success(function(data) {	
		    	return data;
		  	});
		  	
		  	return promise;
		}
	};
}]);

ifpControllers.controller('DefaultCtrl', 
	['$scope','$http','$routeParams','$location','elevations',
  	function($scope,$http,$routeParams,$location,elevations) {
  		
  		console.info('ifpControllers.DefaultCtrl',elevations.data,$routeParams);
	    
	    $scope.elevation = elevations.data[$routeParams.elevation];
	    
	    console.info('ifpControllers.DefaultCtrl.elevation',$scope.elevation);

}]);