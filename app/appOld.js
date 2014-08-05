

(function(){
	var app = angular.module('store',[]);

	var gems = [{
		name: 'pitufo',
		price: '34.99',
		description: 'enano azul',
		soldOut: false,
		canPurchase: true
	},{
		name: 'pitufo2',
		price: '22.99',
		description: 'enano verde',
		soldOut: false,
		canPurchase: false
	}];

	app.controller('StoreController', ["$http", function($http){
		this.products = gems;
		$http.post('http://localhost:9080/api/usuarios/getAll').success(function(data) {
	      console.log(data);
	    });
	}]);


	var NavController = function($scope){
		var self = this;
		this.navSelected = 1;
		this.subNavSelected = 0;
		this.navClass = "";
		this.selectedNavClass = "selected";

		this.setNav = function( nav ){
			this.navSelected = nav;
			this.subNavSelected = 0;
		};

		this.setSubNav = function( sub ){
			this.subNavSelected = sub;
		};


	};


	app.directive('productContent', function(){
		return {
			restrict: 'E',
			templateUrl: 'app/views/product/product-content.html'
		};
	});

	app.directive('navBar',function(){
		return {
			restrict: 'E',
			templateUrl: 'app/views/nav.html',
			controller: ['$scope',NavController],
			controllerAs: 'navbar'
		};
	});

})();