
(function(scope){

	var config = {};

	config.ferrisIp = 'localhost:8080'; 

	scope.appConfig = config;

})(this);

(function(namespace,angular){

	var app = angular.module('pichu.services', []);

	app.factory('NavControllerSharedData', ['$location', function ($location) {
	  return { 
	  		navSelected : 0,
			subNavSelected : 0 ,
			showMiddelNav : false,
			middelTabSelected : 'list',
			selectedUrl : '',
			init: function() {
				this.selectedUrl = $location.path();
			},
			setNav: function( nav, urlKey ){
				this.navSelected = nav;
				this.subNavSelected = 0;
				this.showMiddelNav = false;
				if ( urlKey ){
					this.selectedUrl = urlKey;
					$location.path(this.selectedUrl);
				}
			},
			setSubNav: function( nav, sub, urlKey ){
				this.navSelected = nav;
				this.subNavSelected = sub;
				this.showMiddelNav = true;
				if ( urlKey ) {
					this.selectedUrl = urlKey;
					$location.path(this.selectedUrl);
				}
			},
			setMiddelTab: function( tab ) {
				this.middelTabSelected = tab;
			}
		};
	}]);

})(this,angular);

(function(namespace,angular){

	var app = angular.module('pichu.directives', []);

	app.directive('navBar',function(){
		return {
			restrict: 'E',
			templateUrl: 'app/views/nav.html',
			controller: 'NavController',
			controllerAs: 'navbar'
		};
	});

	app.directive('formUserAdd',function(){
		return {
			restrict: 'E',
			templateUrl: 'app/views/crud/user/form-add.html',
			controller: 'FormUserAddController',
			controllerAs: 'form'
		};
	});

	app.directive('formArtistAdd',function(){
		return {
			restrict: 'E',
			templateUrl: 'app/views/crud/artist/form-add.html',
			controller: 'FormArtistAddController',
			controllerAs: 'form'
		};
	});

	app.directive('formSongAdd',function(){
		return {
			restrict: 'E',
			templateUrl: 'app/views/crud/song/form-add.html',
			controller: 'FormSongAddController',
			controllerAs: 'form'
		};
	});

})(this,angular);
(function(namespace,angular){

	var app = angular.module('pichu.controllers', [  ]);


	app.config( [ '$httpProvider', function($httpProvider) {
	    //Enable cross domain calls
	    $httpProvider.defaults.useXDomain = true;
	    delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}]);

	app.controller('RouterController', ['$scope','$route', '$routeParams', '$location', 
		function($scope,$route,$routeParams,$location){
			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;
	}]);

	app.controller('crud.SongController', ['$scope','$route', '$routeParams', '$location', '$http','NavControllerSharedData',
		function($scope,$route,$routeParams,$location, $http, NavControllerSharedData ){
			$scope.$name = 'crud.SongController';
			$scope.$params = $routeParams;
			NavControllerSharedData.setSubNav( 2, 2 );

			$scope.nav = NavControllerSharedData;
			$scope.artists = [];
			$scope.myArtist = {};
			$scope.songs = [];
			$scope.mySong = {
				title: '',
				description:''
			};


			$scope.$watch('nav.middelTabSelected', function() {
				if ( $scope.nav.middelTabSelected === 'list' ) {
					$http.get('http://'+ appConfig.ferrisIp +'/api/artists/getAll').success(function(data) {
					      	$scope.artists = data;
					      	if ( data.length > 0 ) {
						      	$scope.myArtist = data[0];
						    }
				    });
				    $http.get('http://'+ appConfig.ferrisIp +'/api/songs/getAll').success(function(data) {
					      	$scope.songs = data;
				    });
				}
		   });
	}]);

	app.controller('crud.UserController', ['$scope','$route', '$routeParams', '$location', '$http', 'NavControllerSharedData',
		function($scope,$route,$routeParams,$location, $http, NavControllerSharedData){
			$scope.$route = 'crud.UserController';
			$scope.$params = $routeParams;
			NavControllerSharedData.setSubNav( 2, 1 );

			$scope.nav = NavControllerSharedData;
			$scope.users = [];

			$scope.$watch('nav.middelTabSelected', function() {
				if ( $scope.nav.middelTabSelected === 'list' ) {
					$http.get('http://'+ appConfig.ferrisIp +'/api/usuarios/getAll').success(function(data) {
							      	$scope.users = data;
				    });
				}
		   });

			
	}]);

	app.controller('crud.ArtistController', ['$scope','$route', '$routeParams', '$location', '$http', 'NavControllerSharedData',
		function($scope,$route,$routeParams,$location, $http, NavControllerSharedData){
			$scope.$route = 'crud.ArtistController';
			$scope.$params = $routeParams;
			NavControllerSharedData.setSubNav( 2, 1 );

			$scope.nav = NavControllerSharedData;
			$scope.artists = [];
			$scope.artist = { 'sex' : 'male', 'description': '', 'name' :'' };

			$scope.$watch('nav.middelTabSelected', function() {
				if ( $scope.nav.middelTabSelected === 'list' ) {
					$http.get('http://'+ appConfig.ferrisIp +'/api/artists/getAll').success(function(data) {
					      	$scope.artists = data;
				    });
				}
		   });

			
	}]);

	app.controller('report.UserController', ['$scope','$route', '$routeParams', '$location','$http', 'NavControllerSharedData',
		function($scope,$route,$routeParams,$location,$http,NavControllerSharedData){
			$scope.$route = 'report.UserController';
			$scope.$params = $routeParams;
			NavControllerSharedData.setSubNav( 3, 1 );

	}]);

	app.controller('report.SongController', ['$scope','$route', '$routeParams', '$location', 'NavControllerSharedData',
		function($scope,$route,$routeParams,$location,NavControllerSharedData){
			$scope.$route = 'report.SongController';
			$scope.$params = $routeParams;
			NavControllerSharedData.setSubNav( 3, 2 );
	}]);

	app.controller('NavController', ['$scope', '$location',  'NavControllerSharedData',
		function($scope,$location, NavControllerSharedData){
			var self = this;
			this.nav = NavControllerSharedData;

			if ( $location.path() === '/home') {
				this.nav.setNav( 1 );
			} 
			else if ( $location.path() === '/crud') {
				this.nav.setNav( 2 );
			}
			else if ( $location.path() === '/reports') {
				this.nav.setNav( 3 );
			}

	}]);


	app.controller('FormUserAddController', ['$scope','$http', 
		function($scope,$http){
			$scope.master = {};
			$scope.isSuccess = false;
			$scope.isFailed = false;
			
			

			$scope.save = function( user ){
				$scope.isSuccess = false;
				$scope.isFailed = false;
				$scope.master = angular.copy(user);


				

			    $http({
				    method: 'POST',
				    url: 'http://'+ appConfig.ferrisIp +'/api/usuarios/addNew',
				    data: $scope.master,
				    headers: { 'Content-Type': 'application/json; charset=utf-8', 'dataType':'json' }
				}).success(function(data) {
			      	$scope.isSuccess = true;
			    }).error(function(data){
			    	$scope.isFailed = true;
			    });

			};
	}]);


	app.controller('FormArtistAddController', ['$scope','$http', 
		function($scope,$http){
			$scope.master = {};
			$scope.isSuccess = false;
			$scope.isFailed = false;
			
			$scope.save = function( artist ){
				$scope.isSuccess = false;
				$scope.isFailed = false;
				$scope.master = angular.copy(artist);

			    $http({
				    method: 'POST',
				    url: 'http://'+ appConfig.ferrisIp +'/api/artists/addNew',
				    data: $scope.master,
				    headers: { 'Content-Type': 'application/json; charset=utf-8', 'dataType':'json' }
				}).success(function(data) {
			      	$scope.isSuccess = true;
			    }).error(function(data){
			    	$scope.isFailed = true;
			    });

			};
	}]);


	app.controller('FormSongAddController', ['$scope','$http', 
		function($scope,$http){
			$scope.song = {};
			$scope.artist = {};
			$scope.data = {};
			$scope.isSuccess = false;
			$scope.isFailed = false;
			
			$scope.save = function( artist, song ){
				$scope.isSuccess = false;
				$scope.isFailed = false;
				$scope.song = angular.copy(song);
				$scope.artist = angular.copy(artist);
				$scope.data.song = $scope.song;
				$scope.data.artist = $scope.artist;

			    $http({
				    method: 'POST',
				    url: 'http://'+ appConfig.ferrisIp +'/api/songs/addNew',
				    data: $scope.data,
				    headers: { 'Content-Type': 'application/json; charset=utf-8', 'dataType':'json' }
				}).success(function(data) {
			      	$scope.isSuccess = true;
			    }).error(function(data){
			    	$scope.isFailed = true;
			    });

			};
	}]);




})(this,angular);

(function(namespace,angular){
	var app = angular.module('pichu',
		[
			'ngRoute',
			'pichu.services',
			'pichu.controllers',
			'pichu.directives'
		]);


	app.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/home',{
			templateUrl: 'app/views/home.html'
		})
		.when('/crud/song',{
			templateUrl: 'app/views/crud/song/all.html',
			controller: 'crud.SongController'
		})
		.when('/crud/user',{
			templateUrl: 'app/views/crud/user/all.html',
			controller: 'crud.UserController'
		})
		.when('/crud/artist',{
			templateUrl: 'app/views/crud/artist/all.html',
			controller: 'crud.ArtistController'
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


})(this,angular);