
(function(scope){

	var config = {};

    //set backend base url
	if ( location.host.indexOf('localhost') != -1 ) {
		config.ferrisIp = 'localhost:11080';
	}
	else {
		config.ferrisIp = 'music-app-bakcend-test1.appspot.com'; 
	}

	scope.appConfig = config;

})(this);