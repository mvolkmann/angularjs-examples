(function () {
  'use strict';
  /*global angular: false */

  var module = angular.module('my-directives', []);

  // This is a simple example of defining a custom directive.
  // It is used in partials/footer.html.
  module.directive('division', function () {
    return {
      restrict: 'E', // element
      link: function (scope, element, attrs) {
        var quotient = attrs.dividend / attrs.divisor;
        var percent = (quotient * 100).toFixed(0);
        var text = element.text();
        var pieces = text.split('_');
        var newText = pieces[0] + percent + '%' + pieces[1];
        element.text(newText);
      }
    };
  });
})();
