var dependencies = ['ngRoute','ifpControllers'];
var constants = {};

var ifp = angular.module('ifp',dependencies);

ifp.constant('ifpConstants',constants);

if(typeof ctrlRoutes != 'undefined') {
	ifp.config(['$routeProvider',ctrlRoutes]);
}	