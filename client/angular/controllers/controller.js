myApp.controller("loginController",function($scope, $location, mainFactory){
	$scope.login = function(){
		mainFactory.login($scope.user, function(data){
      console.log('nc', data);
			if(data.status===1){
				$location.path('/userDashboard');
			} else {
				$scope.errors = data.message;
			}
		})
	}
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
			errors+=1
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
				if(data.status!=1){
					console.log('nc', data);
					$location.path('/login');
				}
				else{
					console.log('nc', data.message);
					$scope.errors=data.message;
				}
			})
		}
		else{
			$scope.errors = errorlist;
			errorlist = [];
			errors=0;
		}
	}
});

myApp.controller("userDashboardController", function($scope, $location, mainFactory){

})

myApp.controller("goalController", function($scope, mainFactory){
  $scope.addGoal = function() {
    mainFactory.addGoal($scope.goal);
  }
});

myApp.controller("todoController", function($scope, mainFactory){
  $scope.addTodo = function() {
    mainFactory.addTodo($scope.todo);
  }
});

// myApp.controller("userDashboardController", function($scope, mainFactory){
//   mainFactory.getOneUser()
// });

// myApp.controller("globalDashboardController", function($scope, mainFactory) {
//   mainFactory.getAllUsers()
// });


// });
