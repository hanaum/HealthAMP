myApp.factory("mainFactory", function($http){
	var factory = {};
  var currentUser;
  var currentPlan;

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


  factory.addGoal = function(data, callback) {
    $http.post('', data).success(function(){
   })
  }

  factory.addPlan = function(data, callback) {
    console.log("factory: ", data);
    $http.post('/addPlan', data).success(function(){
    })
  }

  factory.getOneUser = function(info, callback) {
    $http.get('/getOneUser/' + info).success(function(output){
      currentUser = output;
      callback(currentUser);
    })
  }

  factory.getAllUsers = function() {
    $http.get('').success(function(){
    })
  }
  factory.getAllTodos = function(callback) {
    $http.get('/getAllTodos').success(function(output) {
      callback(output);
    })
  }
  factory.getAllGoals = function(callback) {
    $http.get('/getAllGoals').success(function(output) {
      callback(output);
    })
  }

  factory.getOnePlan = function(info, callback) {
    console.log("klsdfjs: ", info);
    $http.get('/getOnePlan/' + info).success(function(output){
      currentPlan = output;
      callback(currentPlan);
    })
  }


  factory.removePlan = function(info, callback){
    $http.post('/removePlan', info).success(function(output){
      callback(output);
    })
  }

  factory.updateTodos = function(info){
    $http.post('/updateTodos', info).success(function(output){

    })
  }

  factory.sharePlan = function(info, callback){
    $http.post('/shareplan', info).success(function(output){

    })
  }

  factory.getAllPlans = function(callback){
    $http.get('/plans').success(function(output){
      callback(output);

    })
  }

	return factory;

});
