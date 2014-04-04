'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.directive('rmvACE', function () {
  return {
    restrict: 'ACE', // A=attribute, C=class, E=element
    template: 'static content'
  };
});

app.directive('rmvM', function () {
  return {
    replace: true,
    restrict: 'M', // M=comment
    template: '<div>static content</div>'
  };
});
