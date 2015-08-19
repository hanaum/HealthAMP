//this creates the angular application
//  inject the ngRoute dependency in the module.
    var myApp = angular.module('myApp', ['ngRoute']);
    //  use the config method to set up routing:
    myApp.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: 'partials/mainpage.html'
        })
        .when('/login',{
            templateUrl: 'partials/login.html'
        })
        .when('/register',{
            templateUrl: 'partials/register.html'
        })
        .when('/goal', {
            templateUrl: 'partials/goal.html'
        })
        .when('/todo', {
            templateUrl: 'partials/todo.html'
        })
        .when('/userdashboard', {
            templateUrl: 'partials/userDashboard.html'
        })
        .when('/globaldashboard', {
            templateUrl: 'partials/globalDashboard.html'
        })
        .when('/logout', {
            templateUrl: 'partials/mainpage.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
