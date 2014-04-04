'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($scope) {
  $scope.n1 = $scope.n2 = 0;
  $scope.sum = function () {
    console.log('sum entered');
    var n1 = $scope.n1;
    var n2 = $scope.n2;
    if (n1 === undefined) n1 = 0;
    if (n2 === undefined) n2 = 0;
    return n1 + n2;
  };
});
