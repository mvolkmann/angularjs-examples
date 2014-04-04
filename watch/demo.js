'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($scope) {
  $scope.n1 = $scope.n2 = 0;
  function sum() {
    console.log('sum entered');
    $scope.sum = $scope.n1 + $scope.n2;
  }
  $scope.$watch('n1', sum);
  $scope.$watch('n2', sum);
});
