/*global angular: false */
(function () {
  'use strict';

  var module = angular.module('MyDirectives', []);

  /**
   * Example usage:
   * <rmv-dialog title="Make a Move" btn-map="btnMap">
   *   ... content goes here ...
   * </rmv-dialog>
   * where btnMap is an object on the scope
   * whose keys are the text for buttons in the footer and
   * whose values are functions to invoke when the buttons are pressed.
   * Omit btn-map if no buttons are needed.
   * In that case there will be no footer area.
   */
  module.directive('rmvDialog', function () {
    return {
      restrict: 'AE',
      templateUrl: 'dialog.html',
      replace: true,
      transclude: true,
      scope: {
        btnMap: '=',
        title: '@'
      }
    };
  });
})();
