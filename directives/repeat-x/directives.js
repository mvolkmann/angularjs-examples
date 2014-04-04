(function () {
  'use strict';
  /*global angular: false */

  var module = angular.module('MyDirectives', []);

  /**
   * Example usage:
   * <div repeat-x="5" text="{{text}}">Hello</div>
   */
  module.directive('repeatX', function () {
    return {
      // This is only called once!
      compile: function (tElement, tAttrs) {
        var currentText = tElement.text();
        var clones = Number(tAttrs.repeatX) - 1;
        for (var i = 0; i < clones; i++) {
          var clone = tElement.clone();
          clone.removeAttr('repeat-x');
          clone.text(currentText + ' ' + tAttrs.append);
          tElement.after(clone);
        }

        // Return a link function.
        // The link property of the directive definition object
        // is ignored when the compile property is present.
        return function (scope, element, attrs) {
          attrs.$observe('append', function (value) {
            // This runs every time
            // the value of the append attribute changes.
            console.log('new append value =', value);
          });
        };
      }
    };
  });
})();
