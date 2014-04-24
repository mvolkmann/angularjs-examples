'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($scope) {
  $scope.people = [
    {name: 'Mark'},
    {name: 'Tami'},
    {name: 'Amanda'},
    {name: 'Jeremy'}
  ];
});
