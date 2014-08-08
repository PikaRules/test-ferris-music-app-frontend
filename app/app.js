
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