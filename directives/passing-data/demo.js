'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($scope) {
  $scope.$root.foo = 1;
  $scope.bar = 2;
});

app.directive('helloWorld1', function () {
  return {
    template: 'Hello, {{first}} {{last}}!',
    link: function (scope, element, attrs) {
      scope.first = attrs.first;
      scope.last = attrs.last;
    }
  };
});

app.directive('helloWorld2', function () {
  return {
    scope: {
      first: '@',
      last: '@'
    },
    template: 'Hello, {{first}} {{last}}!',
  };
});

app.directive('helloWorld3', function () {
  return {
    scope: {
      first: '@',
      last: '@',
      another: '='
    },
    template: 'Hello, {{first}} {{last}}!',
    link: function (scope, element, attrs) {
      // This demonstrates that directives with isolated scope
      // can still access properties in the parent and root scopes.
      console.log('scope.$root.foo =', scope.$root.foo);
      console.log('scope.$parent.bar =', scope.$parent.bar);

      if (!attrs.first) throw new Error('first attribute is required');
      if (!attrs.last) throw new Error('last attribute is required');
    }
  };
});

app.directive('helloWorld4', function () {
  return {
    // When replace is true, the template must have a root element.
    // Attributes on the element where the directive is applied
    // are copied to that root element.
    replace: true,
    scope: {
      first: '@',
      last: '@'
    },
    // The root element is "p".  This will replace the "div".
    template: '<p>Hello, {{first}} {{last}}!</p>'
  };
});
