'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($scope) {
  $scope.arr = [];
  $scope.push = function () {
    $scope.arr.push($scope.n);
    $scope.n = '';
  };
  $scope.$watchCollection('arr', function () {
    $scope.sum = $scope.arr.reduce(
      function (n1, n2) { return n1 + n2; });
  });
});
