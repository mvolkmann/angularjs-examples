'use strict';
/*global angular: false */

var app = angular.module('MyApp', []);

app.controller('MyCtrl', function ($scope) {
  $scope.dump = function () {
    console.log('$scope =', $scope);
    console.log('$scope.myForm =', $scope.myForm);
    console.log('scope methods:');
    for (var prop in $scope) {
      var value = $scope[prop];
      if (typeof value === 'function') console.log(prop);
    }
  };
});
