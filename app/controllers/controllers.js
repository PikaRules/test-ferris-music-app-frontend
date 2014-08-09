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
			$scope.allSongs = 0;
			$scope.loadingAll = true; 

			$http.get('http://'+ appConfig.ferrisIp +'/api/artists/getAll').success(function(data) {
			     $scope.artists = data;
		      	if ( $scope.artists.length > 0 ) {
			      	$scope.myArtist = $scope.artists[0];
			    }
		    });



			$scope.$watch('nav.middelTabSelected', function() {
				if ( $scope.nav.middelTabSelected === 'list' ) {
					$scope.loadingAll = true;
				    $http.get('http://'+ appConfig.ferrisIp +'/api/songs/getAll').success(function(data) {
				      	$scope.songs = data;
				      	$scope.allSongs = data.length;
				      	$scope.loadingAll = false;
				    }).error(function(){
				    	$scope.loadingAll = false; 
				    });
				} else {
					$scope.loadingAll = false;
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
			$scope.allUsers = 0;
			$scope.loadingAll = true; 

			$scope.$watch('nav.middelTabSelected', function() {
				if ( $scope.nav.middelTabSelected === 'list' ) {
					$scope.loadingAll = true;
					$http.get('http://'+ appConfig.ferrisIp +'/api/usuarios/getAll').success(function(data) {
				      	$scope.users = data;
				      	$scope.allUsers = data.length;
				      	$scope.loadingAll = false;
				    }).error(function(){
				    	$scope.loadingAll = false;
				    });
				} else {
					$scope.loadingAll = false;
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
			$scope.allArtists = 0;
			$scope.loadingAll = true; 

			$scope.$watch('nav.middelTabSelected', function() {
				if ( $scope.nav.middelTabSelected === 'list' ) {
					$scope.loadingAll = true;
					$http.get('http://'+ appConfig.ferrisIp +'/api/artists/getAll').success(function(data) {
					      	$scope.artists = data;
					      	$scope.allArtists = data.length;
					      	$scope.loadingAll = false;
				    }).error(function(){
				    	$scope.loadingAll = false;
				    });
				} else {
					$scope.loadingAll = false;
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
			$scope.loading = false;
			

			$scope.save = function( user ){
				$scope.isSuccess = false;
				$scope.isFailed = false;
				$scope.master = angular.copy(user);
				$scope.loading = true;

				

			    $http({
				    method: 'POST',
				    url: 'http://'+ appConfig.ferrisIp +'/api/usuarios/addNew',
				    data: $scope.master,
				    headers: { 'Content-Type': 'application/json; charset=utf-8', 'dataType':'json' }
				}).success(function(resp) {
			      	if( resp.success ){
				      	$scope.isSuccess = true;
				     } else {
				     	$scope.isSuccess = false;
				     	$scope.isFailed = true;
				     }
			      	$scope.loading = false;
			    }).error(function(data){
			    	$scope.isFailed = true;
			    	$scope.loading = false;
			    });

			};
	}]);


	app.controller('FormArtistAddController', ['$scope','$http', 
		function($scope,$http){
			$scope.master = {};
			$scope.isSuccess = false;
			$scope.isFailed = false;
			$scope.loading = false;
			
			$scope.save = function( artist ){
				$scope.isSuccess = false;
				$scope.isFailed = false;
				$scope.master = angular.copy(artist);
				$scope.loading = true;

			    $http({
				    method: 'POST',
				    url: 'http://'+ appConfig.ferrisIp +'/api/artists/addNew',
				    data: $scope.master,
				    headers: { 'Content-Type': 'application/json; charset=utf-8', 'dataType':'json' }
				}).success(function(resp) {
			      	if( resp.success ){
				      	$scope.isSuccess = true;
				     } else {
				     	$scope.isSuccess = false;
				     	$scope.isFailed = true;
				     }
			      	$scope.loading = false;
			    }).error(function(data){
			    	$scope.isFailed = true;
			    	$scope.loading = false;
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
			$scope.loading = false;
			
			$scope.save = function( artist, song ){
				$scope.isSuccess = false;
				$scope.isFailed = false;
				$scope.song = angular.copy(song);
				$scope.artist = angular.copy(artist);
				$scope.data.song = $scope.song;
				$scope.data.artist = $scope.artist;
				$scope.loading = true;

			    $http({
				    method: 'POST',
				    url: 'http://'+ appConfig.ferrisIp +'/api/songs/addNew',
				    data: $scope.data,
				    headers: { 'Content-Type': 'application/json; charset=utf-8', 'dataType':'json' }
				}).success(function(resp) {
					if( resp.success ){
				      	$scope.isSuccess = true;
				     } else {
				     	$scope.isSuccess = false;
				     	$scope.isFailed = true;
				     }
			      	$scope.loading = false;
			    }).error(function(resp){
			    	$scope.isFailed = true;
			    	$scope.loading = false;
			    });

			};
	}]);




})(this,angular);