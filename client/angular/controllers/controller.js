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
	$scope.changed = {};
    $scope.remove = [];
    $scope.user = [];
    $scope.plan = {};
    //$scope.shareable = {};
    // $scope.$apply();

    console.log("user id: ", $routeParams);
    mainFactory.getOneUser($routeParams.id, function(data) {
        $scope.user = data;
        $scope.changed = {};

    })
    $scope.removeClicked = function(plan) {
        $scope.remove = plan._id;
        $scope.plan._id = plan._id;
    }
    //FINISH THIS
    $scope.removePlan = function(plan) {
    	$scope.plan.user = $scope.user._id;
        console.log($scope.plan);
        mainFactory.removePlan($scope.plan, function(data){
        	mainFactory.getOneUser($routeParams.id, function(data) {
		        $scope.user = data;
		    })
        })

    }

    $scope.sharePlan = function(plan){

    	$scope.changed[plan]._id = plan;
    	console.log($scope.changed[plan]);
    	mainFactory.sharePlan($scope.changed[plan], function(data){
    		mainFactory.getOneUser($routeParams.id, function(data) {
		        $scope.user = data;
		    })
    	})
        
    }

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
    var todos = [];
    for(x in $scope.plan){
    	todos.push($scope.plan[x]._id);
    }
    mainFactory.updateTodos(todos);
  }
});



// myApp.controller("userDashboardController", function($scope, mainFactory){
//   mainFactory.getOneUser()
// });

myApp.controller("globalDashboardController", function($scope, mainFactory) {
  	$scope.todoList = [];
  	$scope.plans = [];
  	mainFactory.getAllTodos(function(data) {
    // console.log("todos: ", data);
    $scope.todoList = data;

    mainFactory.getAllPlans(function(data){
    	$scope.plans = data;
    	console.log("GLOBAL CONTROLLER", $scope.plans);
    })



    var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
 
	var formatPercent = d3.format("d");

	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .tickFormat(formatPercent);

	var tip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-10, 0])
	  .html(function(d) {
	    return "<strong>Todo:</strong> <span style='color:red'>" + d.title + "</span>";
	  })

	var svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.call(tip);

	var data = [];
	for(index in $scope.todoList){
		data.push({letter: index, title: $scope.todoList[index].title, count: $scope.todoList[index].count});
	}

	  x.domain(data.map(function(d) { return d.letter; }));
	  y.domain([0, d3.max(data, function(d) { return d.count; })]);

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Plans");

	  svg.selectAll(".bar")
	      .data(data)
	    .enter().append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d) { return x(d.letter); })
	      .attr("width", x.rangeBand())
	      .attr("y", function(d) { return y(d.count); })
	      .attr("height", function(d) { return height - y(d.count); })
	      .on('mouseover', tip.show)
	      .on('mouseout', tip.hide)


	function type(d) {
	  d.count = +d.count;
	  return d;
	}
	  })
	});


// });
