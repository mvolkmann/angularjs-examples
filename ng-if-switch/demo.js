'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($scope) {
  $scope.hungry = true;
  $scope.meal = 'lunch';
});
