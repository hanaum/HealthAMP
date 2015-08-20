//this creates the angular application
//  inject the ngRoute dependency in the module.
    var myApp = angular.module('myApp', ['ngRoute', 'ui.sortable']);
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
        .when('/plan', {
            templateUrl: 'partials/plan.html'
        })
        .when('/userDashboard', {
            templateUrl: 'partials/userDashboard.html'
        })
        .when('/globalDashboard', {
            templateUrl: 'partials/globalDashboard.html'
        })
        .when('/logout', {
            templateUrl: 'partials/mainpage.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
