'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($scope) {
  $scope.logoUrl = 'http://angularjs.org/img/AngularJS-large.png';
});
