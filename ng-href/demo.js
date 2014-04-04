'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($scope) {
  $scope.tools = {
    'AngularJS': 'http://angularjs.org',
    'Grunt': 'http://gruntjs.com',
    'JSHint': 'http://www.jshint.com',
    'LESS': 'http://lesscss.org',
    'Twitter Bootstrap': 'http://getbootstrap.com',
  };

  // Restore previous selection.
  $scope.toolUrl = sessionStorage.toolUrl;

  // Save selection so it can be restored
  // when back button is pressed.
  $scope.saveToolUrl = function () {
    sessionStorage.toolUrl = $scope.toolUrl;
  };
});
