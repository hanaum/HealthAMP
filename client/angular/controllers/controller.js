myApp.controller("loginController",function($scope){
	///Stuff goes here
}	

myApp.controller("registerController", function($scope, mainFactory){
	$scope.register = function(){
		mainFactory.register($scope.reg);	
}

myApp.controller("goalController", function($scope, mainFactory){
  $scope.addGoal = function() {
    mainFactory.addGoal($scope.goal);;
  } 

}
