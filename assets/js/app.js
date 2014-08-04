
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
		$http.get('http://localhost:8080/api/usuarios').success(function(data) {
	      console.log(data);
	    });
	}]);

	app.directive('productContent', function(){
		return {
			restrict: 'E',
			templateUrl: 'app/views/product/product-content.html'
		};
	});

})();