'use strict';
/*global angular: false, history: false */

var app = angular.module('DemoApp', ['ui.router']);

app.controller('DemoCtrl', function ($scope) {
});

app.config(function ($stateProvider, $urlRouterProvider) {
  console.log('query parameters are', location.search);
  // Remove the query parameters from the current URL.
  history.replaceState(null, null, '/');

  $urlRouterProvider.otherwise('/one');
  
  $stateProvider
    .state('one', {
      url: '/one',
      controller: 'DemoCtrl',
      template: '<h1>State One</h1>'
    })
    .state('two', {
      url: '/two',
      controller: 'DemoCtrl',
      template: '<h1>State Two</h1>'
    });
});
