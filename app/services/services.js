
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
