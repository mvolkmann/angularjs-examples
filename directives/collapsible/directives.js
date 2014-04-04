(function () {
  'use strict';
  /*global angular: false */

  var module = angular.module('MyDirectives', ['ngSanitize']);

  /**
   * Example usage:
   * <collapsible title="{{some-expression}}">
   *   <!-- content goes here -->
   * </collapsible>
   */
  module.directive('collapsible', function () {
    var downTri = '&#x25bc;', rightTri = '&#x25b6;';
    var body, bodyHeight;

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<div class="collapsible">' +
        '<div class="collapsible-title" ng-click="toggle()">' +
        '{{title}}' +
        '<span class="collapsible-triangle" ng-bind-html="triangle"></span>' +
        '</div>' +
        '<div class="collapsible-body" ng-transclude></div>' +
        '</div>',
      scope: {
        title: '@'
      },
      link: function ($scope, element) {
        body = element.children()[1];
        bodyHeight = body.offsetHeight;

        $scope.triangle = downTri;
        
        $scope.toggle = function () {
          var visible = $scope.triangle == downTri;
          $scope.triangle = visible ? rightTri : downTri;
          body.style.opacity = visible ? 0 : 1;
          body.style.height = visible ? 0 : bodyHeight + 'px';
        };
      }
    };
  });
})();
