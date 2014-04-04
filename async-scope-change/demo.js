'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.factory('demoSvc', function ($rootScope, $q, $timeout) {
  var svc = {};

  svc.getName = function () {
    var dfr = $q.defer();

    $timeout(function () {
      dfr.resolve('Mark');
    }, 500);

    return dfr.promise;
  };

  return svc;
});

app.controller('DemoCtrl', function ($scope, demoSvc) {
  $scope.name = 'Richard';
  demoSvc.getName().then(function (name) {
    $scope.name = name;
  });
});
