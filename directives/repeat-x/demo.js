(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('Demo', ['MyDirectives']);

  app.controller('DemoCtrl', function ($scope) {
    $scope.message = 'foo';
    $scope.changeMessage = function () {
      // Toggle value between 'foo' and 'bar'.
      $scope.message = $scope.message === 'foo' ? 'bar' : 'foo';
    };
  });
})();
