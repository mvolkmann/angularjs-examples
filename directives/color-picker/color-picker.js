/*global angular: false */
(function () {
  'use strict';

  var module = angular.module('MyDirectives', []);

  module.factory('colorToRgbString', function () {
    return function (color) {
      return 'rgb(' + color.red + ',' +
        color.green + ',' + color.blue + ')';
    };
  });

  /**
   * Example usage: <rmv-color-picker></rmv-color-picker>
   */
  module.directive('rmvColorPicker', function (colorToRgbString) {
    function updateSwatch(scope) {
      scope.swatchStyle.backgroundColor = colorToRgbString(scope.color);
    }

    return {
      restrict: 'AE',
      templateUrl: 'color-picker.html',
      replace: true,
      scope: {
        color: '=ngModel'
      },
      link: function (scope) {
        scope.swatchStyle = {};
        var fn = updateSwatch.bind(null, scope);
        scope.$watch('color.red', fn);
        scope.$watch('color.green', fn);
        scope.$watch('color.blue', fn);
      }
    };
  });
})();
