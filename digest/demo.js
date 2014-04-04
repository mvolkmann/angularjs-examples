'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($http, $interval, $scope, $timeout) {
  $scope.foo = {bar: {baz: 19}};
  /*
  $interval(function () {
    console.log('interval ran');
  }, 2000);

  $timeout(function () {
    console.log('timeout ran');
  }, 3000);
  */

  $scope.getStuff = function () {
    $scope.foo.bar.baz++;
    /*
    $http.get('players.json').
      success(console.log).
      error(console.log);
    */
  };

  /*
  $scope.$watch(function () {
    console.log('in digest cycle');
  });

  $scope.$watch('text', function (newValue, oldValue) {
    console.log('text changed from', oldValue, 'to', newValue);
  });
  */
});
