'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

// This is an example of a recursive directive.
// In its current form it gives a "Maximum call stack exceeded" error.
app.directive('inspect', function () {
  return {
    replace: true,
    scope: {
      object: '='
    },
    template: '<div ng-repeat="(key, value) in object">' +
      '<div ng-hide="isObject(value)">{{key}} = {{value}}</div>' +
      '<div ng-show="isObject(value)" inspect object="{{value}}">' +
      '{{key}} = an object</div>' +
      '</div>',
    link: function (scope) {
      console.log('scope.object =', scope.object);

      scope.isObject = function (value) {
        console.log('isObject: value =', value);
        return typeof value === 'object';
      };
    }
  };
});

app.controller('DemoCtrl', function ($scope) {
  $scope.myObj = {
    foo: true,
    bar: 19,
    baz: 'some text',
    qux: [1, 3, 7]
  };
});
