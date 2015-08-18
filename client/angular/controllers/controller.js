myApp.controller("loginController",function($scope){
<<<<<<< HEAD
	
=======
	///Stuff goes here
>>>>>>> added factory methods getOneUser, getAllUsers
});	

myApp.controller("registerController", function($scope, mainFactory){
	$scope.register = function(){
		console.log($scope.reg);
		mainFactory.register($scope.reg);	
});

myApp.controller("goalController", function($scope, mainFactory){
  $scope.addGoal = function() {
    mainFactory.addGoal($scope.goal);;
  } 
});

myApp.controller("todoController", function($scope, mainFactory){
  $scope.addTodo = function() {
    mainFactory.addTodo($scope.todo) {
    }
  }
});

myApp.controller("userDashboardController", function($scope, mainFactory){
  mainFactory.getOneUser()
});

myApp.controller("globalDashboardController", function($scope, mainFactory) {
  mainFactory.getAllUsers()
});
  

});
