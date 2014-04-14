'use strict';
/*global angular: false */
var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($scope) {
  $scope.btnClass = 'old-name';

  $scope.nameChanged = function () {
    $scope.btnClass = 'new-name';
  };

  $scope.greet = function () {
    $scope.btnClass = 'old-name';
    alert('Hello, ' + $scope.name + '!');
  };
});
