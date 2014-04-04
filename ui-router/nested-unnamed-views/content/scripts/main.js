/*global angular: false */
(function () {
  'use strict';

  var app = angular.module('MySeed', ['ui.router']);

  app.controller('TopCtrl', function ($scope) {
    $scope.top = 'foo';
  });

  app.controller('MiddleCtrl', function ($scope) {
    $scope.middle = 'bar';
  });

  app.controller('BottomCtrl', function ($scope) {
    $scope.bottom = 'baz';
  });
})();
