myApp.controller("loginController",function($scope){
	
});	

myApp.controller("registerController", function($scope, mainFactory){
	$scope.register = function(){
		console.log($scope.reg);
		mainFactory.register($scope.reg);	
	}
});

myApp.controller("goalController", function($scope, mainFactory){
  $scope.addGoal = function() {
    mainFactory.addGoal($scope.goal);;
  } 

});
