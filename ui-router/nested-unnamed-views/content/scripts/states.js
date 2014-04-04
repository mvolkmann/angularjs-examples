/*global angular: false */
(function () {
  'use strict';

  var app = angular.module('MySeed');

  app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/top');

    $stateProvider
      .state('top', {
        url: '/top',
        controller: 'TopCtrl',
        templateUrl: 'partials/top.html'
      })
      .state('top.middle', {
        url: '/middle',
        controller: 'MiddleCtrl',
        templateUrl: 'partials/middle.html'
      })
      .state('top.middle.bottom', {
        url: '/bottom',
        controller: 'BottomCtrl',
        templateUrl: 'partials/bottom.html'
      });
  });
})();
