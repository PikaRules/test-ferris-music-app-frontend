
(function(scope){

	var config = {};

	config.ferrisIp = 'localhost:8081'; 

	scope.appConfig = config;

})(this);

(function(){
	var app = angular.module('store',['ngRoute']);


	app.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/crud/song',{
			templateUrl: 'app/views/crud/song/all.html',
			controller: 'crud.SongController'
		})
		.when('/crud/user',{
			templateUrl: 'app/views/crud/user/all.html',
			controller: 'crud.UserController'
		})
		.when('/reports/user',{
			templateUrl: 'app/views/report/user/main.html',
			controller: 'report.UserController'
		})
		.when('/reports/song',{
			templateUrl: 'app/views/report/song/main.html',
			controller: 'report.SongController'
		});
	}]);

	app.controller('RouterController', ['$scope','$route', '$routeParams', '$location', 
		function($scope,$route,$routeParams,$location){
			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;
	}]);

	app.controller('crud.SongController', ['$scope','$route', '$routeParams', '$location', 
		function($scope,$route,$routeParams,$location){
			$scope.$name = 'crud.SongController';
			$scope.$params = $routeParams;
	}]);

	app.controller('crud.UserController', ['$scope','$route', '$routeParams', '$location', 
		function($scope,$route,$routeParams,$location){
			$scope.$route = 'crud.UserController';
			$scope.$params = $routeParams;
	}]);

	app.controller('report.UserController', ['$scope','$route', '$routeParams', '$location','$http', 
		function($scope,$route,$routeParams,$location,$http){
			$scope.$route = 'report.UserController';
			$scope.$params = $routeParams;

			$http.post('http://localhost:9080/api/usuarios/getAll').success(function(data) {
		      	console.log(data);
		    });

	}]);

	app.controller('report.SongController', ['$scope','$route', '$routeParams', '$location', 
		function($scope,$route,$routeParams,$location){
			$scope.$route = 'report.SongController';
			$scope.$params = $routeParams;
	}]);

	app.controller('NavController', ['$scope', '$location', 
		function($scope,$location){
			var self = this;
			this.navSelected = 1
			this.subNavSelected = 0;
			this.selectedUrl = '';

			this.setNav = function( nav, urlKey ){
				this.navSelected = nav;
				this.subNavSelected = 0;
				this.selectedUrl = urlKey;
				$location.path(this.selectedUrl);
			};

			this.setSubNav = function( sub, urlKey ){
				this.subNavSelected = sub;
				this.selectedUrl = urlKey;
				$location.path(this.selectedUrl);
			};
	}]);


	app.directive('navBar',function(){
		return {
			restrict: 'E',
			templateUrl: 'app/views/nav.html',
			controller: 'NavController',
			controllerAs: 'navbar'
		};
	});

})();