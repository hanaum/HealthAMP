myApp.controller("loginController",function($scope, $location, mainFactory){
	$scope.login = function(){
		mainFactory.login($scope.user, function(data){
      console.log('nc', data);
			if(data.status===1){
				console.log("data: ", data.results._id);
				$location.path('/userDashboard/' + data.results._id);
			} else {
				$scope.errors = [data.message];
			}
		})
	}
});

myApp.buildArray = function(name, size) {
  var i, array = [];
  for (i = 1; i <= size; i++){
    array.push({
      text: name + ' ' + i ,
      value: i
    });
  }

  return array;
};

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
					console.log('nc email is taken?', data.message);
					$scope.errors=[data.message];
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


myApp.controller("userDashboardController", function($scope, $routeParams, $location, mainFactory){
    $scope.remove = [];
    $scope.user = [];

    console.log("user id: ", $routeParams);
    mainFactory.getOneUser($routeParams.id, function(data) {
        $scope.user = data;
    })

})

myApp.controller("todoController", function($scope, $routeParams, mainFactory){
    $scope.plan = [];
    $scope.todoList = [];
    $scope.goals = [];
    $scope.isChecked = {};
  $scope.leftArray = myApp.buildArray('Left', 5);
  $scope.rightArray = myApp.buildArray('Right', 5);
  $scope.sortableOptions = {
    connectWith: '.connectedItemsExample .list'
  };
  mainFactory.getAllTodos(function(data) {
    // console.log("todos: ", data);
    $scope.todoList = data;
  })
  mainFactory.getAllGoals(function(data) {
        //console.log("client controller: ", data);
        $scope.goals = data;
    })

  $scope.updatePlan = function(goal){
    //console.log($scope.goals.indexOf(id));
    // console.log($scope.isChecked[goal._id]);
    if($scope.isChecked[goal._id].checked){
        for(todo of $scope.goals[$scope.goals.indexOf(goal)].todos){
            var exists = false;
            for(i in $scope.plan){
            	if($scope.plan[i]._id == todo._id)
            		exists = true;
            }
            if(!exists)
            	$scope.plan.push(todo);
            for(temptodo in $scope.todoList){
                if($scope.todoList[temptodo]._id == todo._id){
                    $scope.todoList.splice(temptodo,1);
                    break;
                }
            }

            //$scope.todoList.splice($scope.todoList.indexOf(todo),1);
        }
    } else {
        for(todo of $scope.goals[$scope.goals.indexOf(goal)].todos){
            var exists = false;
            for(i in $scope.todoList){
            	if($scope.todoList[i]._id == todo._id)
            		exists = true;
            }
            if(!exists)
            	$scope.todoList.push(todo);
            for(temptodo in $scope.plan){
                if($scope.plan[temptodo]._id == todo._id){
                    $scope.plan.splice(temptodo,1);
                    break;
                }
            }

            //$scope.todoList.splice($scope.todoList.indexOf(todo),1);
        }
    }

    // console.log("TODO LIST", $scope.todoList);
  }
  $scope.addPlan = function() {
    $scope.newPlan.plans = $scope.plan;
    $scope.newPlan.user_id = $routeParams.id;
    console.log("newPlan: ", $scope.newPlan);

    mainFactory.addPlan($scope.newPlan, function(data) {
    })
    $scope.newPlan = {};

  }
});



// myApp.controller("userDashboardController", function($scope, mainFactory){
//   mainFactory.getOneUser()
// });

// myApp.controller("globalDashboardController", function($scope, mainFactory) {
//   mainFactory.getAllUsers()
// });


// });
