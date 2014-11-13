var ctrlRoutes = function ctrlRoutes($routeProvider) {
	$routeProvider.
		when('/:floorplan', {
	        templateUrl: '/partials/floor-plan-display.html',
	        controller: 'DefaultCtrl',
	        resolve: {
	        	floorPlan: ['$route','ifpData',function($route,ifpData){
	        		return ifpData.getFloorPlan($route.current.params.floorplan);
	        	}]
	        }
		}).
	    otherwise({
	        redirectTo: '/:floorplan'
	    });  
};

var ifpControllers = angular.module('ifpControllers',
    ['ifpDirectives']);

ifpControllers.factory('ifpData', 
	['$http','$rootScope','$q','$route',
	function($http,$rootScope,$q,$route) {
	return {
		getFloorPlan: function(floorplan) {
			if(typeof floorplan == 'undefined'){
				floorplan = 0;
			}
			var promise =  $http.get('/ParseSVG.php?svg='+floorplan).success(function(data) {	
		    	return data;
		  	});
		  	
		  	return promise;
		}
	};
}]);

ifpControllers.controller('DefaultCtrl', 
	['$scope','$http','$routeParams','$location','floorPlan',
  	function($scope,$http,$routeParams,$location,floorPlan) {
	    
	    $scope.floorPlan = floorPlan.data;
	    
	    console.info('ifpControllers.DefaultCtrl.floorPlan',$scope.floorPlan);

}]);