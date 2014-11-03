if(typeof dependencies == 'undefined') {
	var dependencies = [];
}

if(typeof constants == 'undefined') {
	var constants = {};
}

var ifp = angular.module('ifp',dependencies);

ifp.constant('ifpConstants',constants);

if(typeof ctrlRoutes != 'undefined') {
	ifp.config(['$routeProvider',ctrlRoutes]);
}	