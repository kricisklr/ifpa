var dependencies = ['ngRoute'];
var constants = {};

var ifp = angular.module('ifp',dependencies);

ifp.constant('ifpConstants',constants);

if(typeof ctrlRoutes != 'undefined') {
	ifp.config(['$routeProvider',ctrlRoutes]);
}	