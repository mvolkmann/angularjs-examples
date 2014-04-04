'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($interval, $scope) {
  var count = 5, ms = 1000, n = 100;
  $scope.status = 'not started yet';

  function errorCb(reason) {
    $scope.status = 'error: reason=' + reason;
  }

  function notifyCb(iterIndex) {
    $scope.status = 'notify: iterIndex=' + iterIndex + ', n=' + n;
  }

  function successCb(iterIndex) {
    $scope.status = 'success: iterIndex=' + iterIndex + ', n=' + n;
  }

  // First call to fn happens after ms.
  function fn() { return ++n; }
  var promise = $interval(fn, ms, count);
  promise.then(successCb, errorCb, notifyCb);

  $scope.cancel = function () {
    $interval.cancel(promise);
  };
});
