(function () {
  'use strict';
  /*global angular: false */

  var module = angular.module('MyDirectives', []);

  module.directive('prePostDemo', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div>original content</div>',

      // The compile function can perform DOM manipulation on the template.
      // It does not have access to the scope, so can't use that data.
      compile: function (tElement) { //, tAttrs, transclude) {
        console.log('compile called');
        tElement.text(tElement.text() + '; compile content');
        return {
          pre: function (scope, iElement) { //, iAttrs, controller) {
            console.log('compile pre called');
            iElement.text(iElement.text() + '; pre content');
          }, 
          post: function (scope, iElement) { //, iAttrs, controller) {
            console.log('compile post called');
            iElement.text(iElement.text() + '; post content');
          } 
        };
      },

      // The link option is ignored if the compile option is present.
      // The link function can perform DOM manipulation
      // on instances of the template.
      // It has access to the scope, so can use that data.
      // It can also register listeners on instance elements.
      link: function () { //scope, element, attrs) {
        console.log('link called'); // not output
      }
    };
  });
})();
