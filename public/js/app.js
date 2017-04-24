var mainApp = angular.module('mainApp',['ngRoute']);
mainApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/',{
        templateUrl:'tpls/Main.html',
        controller:'userCtrl'
    });

    $routeProvider.when('/main',{
        templateUrl:'tpls/Main.html',
        controller:'userCtrl'
    });



}]);

mainApp.controller('mainCtrl',['$http','$rootScope','$scope','$location',function($http, $rootScope, $scope, $location)
    {
    }]);