'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($scope) {
});

app.filter('myFilter', function () {
  return function (value) {
    console.log('in filter');
    return value;
  };
});
