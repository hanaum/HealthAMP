myApp.factory("mainFactory", function($http){
	var factory = {};
  var currentUser;
	
	factory.register = function(data, callback){
		$http.post('/register', data). success(function(output){
      console.log('nf', output);
			callback(output);
   		 });
	};
	
	factory.login = function(data, callback){
		$http.post('/login', data).success(function(output){
      console.log('nf', output);
      if(output.status==1) {
        currentUser = output.results;
        callback(output);
        // console.log(currentUser);
      } else {
        callback(output);
      }
		});
	};


  factory.addGoal = function(data) {
    $http.post('', data).success(function(){
   })
  }
  factory.addTodo = function(data) {
    $http.post('', data).success(function(){
    })
  }

  factory.getOneUser = function() {
    $http.get('').success(function(){
    })
  }
	
  factory.getAllUsers = function() {
    $http.get('').success(function(){
    })
  }

	return factory;

});
