(function () {
  'use strict';

  var app = angular.module('SiblingViews', ['ui.router']);

  app.controller('SiblingCtrl', function ($scope) {
    $scope.changeColor = function (colorName) {
      $('section').css('color', colorName);
    };

    $scope.changeFontSize = function (size) {
      $('section').css('font-size', size);
    };
  });

  app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/first');

    $stateProvider
      .state('first', {
        url: '/first',
        views: {
          header: {
            templateUrl: 'partials/header1.html'
          },
          nav: {
            controller: 'SiblingCtrl',
            templateUrl: 'partials/nav1.html'
          },
          body: {
            templateUrl: 'partials/body1.html'
          },
          footer: {
            templateUrl: 'partials/footer1.html'
          }
        }
      })
      .state('second', {
        url: '/second',
        views: {
          header: {
            templateUrl: 'partials/header2.html'
          },
          nav: {
            controller: 'SiblingCtrl',
            templateUrl: 'partials/nav2.html'
          },
          body: {
            templateUrl: 'partials/body2.html'
          },
          footer: {
            templateUrl: 'partials/footer2.html'
          }
        }
      });
  });
})();
