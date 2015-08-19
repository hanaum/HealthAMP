myApp.controller("loginController",function($scope){
	
});	

myApp.controller("registerController", function($scope, $location, mainFactory){
	$scope.reg = {};
	$scope.reg.name = "";
	$scope.reg.password = "";
        $scope.reg.passwordconfirm="";
	$scope.reg.age =0;
	$scope.reg.weight=0;	
	var errors = 0;
	var errorlist = [];

	$scope.register = function(){
		if($scope.reg.age<=10){
			errors+=1;
			errorlist.push("You must be at least 10 years old to register");
		}
		if($scope.reg.name.length<=3){
			errors+=1;
			errorlist.push("Name must be at least 3 characters long");
		}
		if($scope.reg.password.length<5){
			errors+=1;
			errorlist.push("Password must be at least 5 characters long");
		}
		if($scope.reg.password!=$scope.reg.passwordconfirm){
			errors+=1;
			errorlist.push("Passwords don't match");
		}
		if($scope.reg.weight<=30){
			errors+=1;
			errorlist.push("Weight cannot be below 30lbs");
		}
		if(errors==0){
			mainFactory.register($scope.reg, function(data){
			if(data = 1){
				$location.path('/login');
			};
		})
		}
		else{
			$scope.errors = errorlist;
			errorlist = [];
			errors=0;
		}			
	}
});

myApp.controller("goalController", function($scope, mainFactory){
  $scope.addGoal = function() {
    mainFactory.addGoal($scope.goal);;
  } 

});
