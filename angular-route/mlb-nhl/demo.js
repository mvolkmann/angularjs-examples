'use strict';
/*global $: false, angular: false */

var app = angular.module('RoutesDemo', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider.
    when('/baseball', {
      controller: 'BaseballCtrl',
      templateUrl: 'partials/baseball.html',
      view: 'center'
    }).
    when('/hockey/:conference?', {
      controller: 'HockeyCtrl',
      templateUrl: 'partials/hockey.html',
      view: 'center'
    }).
    otherwise({
      redirectTo: '/baseball'
    });
});

app.controller('DemoCtrl', function ($scope, $location) {
  $scope.showBaseball = function () {
    $location.path('/baseball');
  };

  $scope.showHockey = function () {
    $location.path('/hockey');
  };
});
