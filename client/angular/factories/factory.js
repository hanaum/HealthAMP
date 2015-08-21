myApp.factory("mainFactory", function($http){
	var factory = {};
  var currentUser;
  var currentPlan;
  var currentTodo;

	factory.register = function(data, callback){
		$http.post('/register', data).success(function(output){
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
  factory.getUserbyEmail = function(info,callback){
    $http.get('/userbyemail/'+info).success(function(output){
      currentUser = output;
      callback(currentUser);
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
    $http.get('/getOnePlan/' + info).success(function(output){
      currentPlan = output;
      callback(currentPlan);
    })
  }
  factory.seeTodoInfo = function(info, callback) {
    console.log("klsdfjs: ", info);
    $http.get('/seeTodoInfo/'+ info).success(function(output){
      currentTodo = output;
      callback(currentTodo);
    })
  }


  factory.removePlan = function(info, callback){
    $http.post('/removePlan', info).success(function(output){
      callback(output);
    })
  }

  factory.editPlan = function(info, callback){
    $http.post('/editPlan', info).success(function(output){
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

  factory.getCurrentUserInfo = function(callback){
    // console.log('grabbing current user', currentUser);
    callback(currentUser);
  }

	return factory;

});
