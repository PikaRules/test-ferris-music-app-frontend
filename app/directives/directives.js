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