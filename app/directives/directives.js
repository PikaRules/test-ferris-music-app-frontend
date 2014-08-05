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

})(this,angular);