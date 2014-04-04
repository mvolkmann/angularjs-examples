(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('Demo', ['MyDirectives']);

  app.controller('DemoCtrl', function ($scope, colorToRgbString) {
    // Initial values.
    $scope.myColor = {red: 127, green: 127, blue: 127}; // gray
    $scope.textStyle = {};

    $scope.goToYellow = function () {
      $scope.myColor = {red: 255, green: 255, blue: 0};
    };

    $scope.$watchCollection('myColor', function (color) {
      $scope.textStyle.color = colorToRgbString(color);
    });
  });
})();
