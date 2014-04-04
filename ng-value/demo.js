'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($scope) {
  $scope.colors = ['Red', 'Green', 'Blue'];
  $scope.favorite = {color: 'Green'};

  $scope.addColor = function () {
    var color = $scope.newColor;
    if ($scope.colors.indexOf(color) === -1) {
      $scope.colors.push(color);
      $scope.newColor = $scope.errorMessage = '';
    } else {
      $scope.errorMessage = 'The color "' + color + '" is already in the list.';
    }
  };
});
