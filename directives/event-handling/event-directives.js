/*global angular: false */
(function () {
  'use strict';

  var module = angular.module('EventDirectives', []);

  // Checks for delete, tab, and arrow keys.
  function isNavigation(event) {
    var code = event.keyCode;
    return !event.shiftKey &&
      (code === 8 || code === 9 ||
      (code >= 37 && code <= 40)); 
  }

  // Checks for 0 to 9 keys.
  function isDigit(event) {
    var code = event.keyCode;
    return !event.shiftKey &&
      ((code >= 48 && code <= 57) ||
        (code >= 96 && code <= 105)); // keypad
  }

  /**
   * Restricts keys that can be pressed when an input has focus.
   * Example usage: <input type="number" digits-only>
   */
  module.directive('digitsOnly', function () {
    return {
      link: function (scope, element) {
        element.on('keydown', function (event) {
          var valid = isDigit(event) || isNavigation(event);
          // In old versions of IE, event objects
          // do not have the preventDefault method.
          if (!valid && event.preventDefault) event.preventDefault();
          return valid; // for IE8 and earlier
        });
      }
    };
  });

  /**
   * Changes background color of an element
   * when mouse hovers over it.
   * Example usage: <div hover-color="pink">...</div>
   */
  module.directive('hoverColor', function () {
    return {
      scope: {
        hoverColor: '@'
      },
      link: function (scope, element) {
        var prevColor;
        element.on('mouseover', function (event) {
          prevColor = element.css('background-color');
          element.css('background-color', scope.hoverColor);
        });
        element.on('mouseout', function (event) {
          element.css('background-color', prevColor);
        });
      }
    };
  });
})();
