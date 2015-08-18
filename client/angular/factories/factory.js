myApp.factory("mainFactory", function(){
	var factory = {};
	
	factory.register = function(data){
		$http.post('/register', data). success(function(){
    })
	};

  factory.addGoal = function(data) {
    $http.post('', data).success(function(){
    })

  factory.addTodo = function(data) {
    $http.post('', data).success(function(){
    })
  }
	
	return factory;
});
