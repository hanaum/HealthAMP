myApp.factory("mainFactory", function(){
	var factory = {};
	
	factory.register = function(data){
		$http.post('/register', data). success(function(){
			
	}
	
	return factory;
});
