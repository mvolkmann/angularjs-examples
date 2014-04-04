'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.factory('demoSvc', function ($timeout, $q) {
  var svc = {};

  svc.getMessage = function () {
    var dfr = $q.defer();

    $timeout(function () {
      dfr.resolve('Hello!');
    }, 2000);

    return dfr.promise;
  };

  return svc;
});

app.controller('DemoCtrl', function ($scope, demoSvc) {
  $scope.message = demoSvc.getMessage();
});
