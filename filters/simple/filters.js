'use strict';
/*global angular: false */

var app = angular.module('Filters', []);

app.controller('FilterCtrl', function ($scope) {
  $scope.price = 3.19;
  $scope.now = new Date();
  $scope.colors =
    ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
  $scope.topic = 'AngularJS';
  $scope.bigPi = Math.PI * 1e6;

  $scope.balls = [
    {sport: 'baseball', color: 'white', size: 'medium'},
    {sport: 'basketball', color: 'orange', size: 'large'},
    {sport: 'football', color: 'brown', size: 'large'},
    {sport: 'golf', color: 'white', size: 'small'},
    {sport: 'hockey', color: 'black', size: 'medium'},
    {sport: 'tennis', color: 'yellow', size: 'medium'}
  ];

  $scope.greekObj = {
    delta: {v: 4},
    beta: {v: 2},
    epsilon: {v: 5},
    gamma: {v: 3},
    alpha: {v: 1}
  };

  $scope.longString = function (text) {
    return text.length > 5;
  };

  $scope.identity = angular.identity;
});
