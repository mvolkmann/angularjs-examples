'use strict';
/*global angular: false */

var app = angular.module('Directives', []);

app.controller('AddressCtrl', function ($scope) {
  $scope.address = {
    street: '123 Some Street',
    city: 'Some City',
    state: 'MO',
    zip: 12345
  };
});

app.directive('stateSelect', function () {
  var states = {
    IL: 'Illinois',
    KS: 'Kansas',
    MO: 'Missouri'
  };

  return {
    restrict: 'E',
    replace: true,
    require: '^ngModel',
    // Don't want an isolate scope because you need access to an ancestor scope.
    template: '<select ' +
      'ng-options="abbrev as name for (abbrev, name) in states">' +
      '</select>',
    link: function (scope) {
      scope.states = states;
    }
  };
});
