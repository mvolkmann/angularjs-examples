'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

// This is an example of a recursive directive.
app.directive('inspect', function ($compile) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      value: '='
    },
    link: function (scope, element) {
      var quote, template, v = scope.value, type = typeof v;

      if (v && type === 'object') { // object or array, not null
        template = '<ul><li ng-repeat="(k, v) in value">{{k}}' +
          '<inspect value="v"></inspect></li></ul>';
      } else {
        quote = type === 'string' ? '"' : '';
        template = '<span> = ' + quote + v + quote + '</span>';
      }

      $compile(template)(scope, function (clone) {
        element.append(clone);
      });
    }
  };
});

app.controller('DemoCtrl', function ($scope) {
  $scope.myObj = {
    never: undefined,
    none: null,
    bool: true,
    number: 19,
    text: 'some text',
    arr: [1, 3, 7],
    level1: {
      level2: {
        level3: {
          level4: 'end'
        }
      }
    }
  };
});
