'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($scope) {
  $scope.foo = {bar: {baz: 'initial'}};

  function listener(newValue) {
    console.log('baz =', newValue.bar.baz);
  }

  $scope.$watch('foo', listener, true); // deep watch
});
