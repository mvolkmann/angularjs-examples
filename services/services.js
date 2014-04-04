'use strict';
/*global angular: false */

var app = angular.module('Services', []);

// This example shows five ways to define a service.

// #1: Using a constant
// This is for primitives and objects that only contain data, not functions.
app.constant('startingValue', 3);

// #2: Using a primitive, function or object (may contain functions) value
// Services can't be injected into these functions.
app.value('doubleIt', function (n) { return n * 2; });

// #3: Using a "factory" function
// Can inject services when defined this way (ex. $log).
app.factory('factorySvc', function ($log) {
  $log.log('factorySvc entered');
  var svc = {};
  svc.double = function (number) { return number * 2; };
  return svc;
});

// #4: Using a constructor function
// Can inject services when defined this way (ex. $log).
function Doubler($log) {
  $log.log('constructor entered');
  this.double = function (number) { return number * 2; };
}
app.service('ctorSvc', Doubler);

// #5: Using a "provider" function
// Can inject services when defined this way (ex. $log).
app.provider('configurableSvc', function () {
  this.multiplier = 2;
  this.setMultiplier = function (multiplier) {
    this.multiplier = multiplier;
  };
  this.$get = function ($log) {
    $log.log('$get entered');
    var m = this.multiplier;
    return {
      double: function (n) { return n * m; }
    };
  };
});

// The service "configurableSvcProvider"
// is created automatically by app.provider.
app.config(function (configurableSvcProvider) {
  configurableSvcProvider.setMultiplier(3);
});

// Each of the five types of services defined above
// is injected into this controller.
app.controller('MyCtrl',
  function ($scope, startingValue,
    doubleIt, factorySvc, ctorSvc, configurableSvc) {

  $scope.number = startingValue;

  $scope.double = function () {
    //$scope.number = doubleIt($scope.number);
    //$scope.number = factorySvc.double($scope.number);
    //$scope.number = ctorSvc.double($scope.number);
    $scope.number = configurableSvc.double($scope.number);
  };
});
