(function () {
  'use strict';

  var app = angular.module('Diner', ['ui.router']);

  // This is not currently being used.
  app.factory('stateMonitorSvc', function ($rootScope) {
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        console.log('changing state from', fromState.name, 'to', toState.name);
      });

    $rootScope.$on('$stateChangeSuccess',
      function (event, toState, toParams, fromState, fromParams) {
        console.log('changed state from', fromState.name, 'to', toState.name);
      });

    $rootScope.$on('$stateNotFound', function (unfoundState) {
      console.log('tried to change to state', unfoundState.to,
        'but that state is not known');
    });

    $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, fromState, fromParams, error) {
        console.log(error, 'changing state from',
          fromState.name, 'to', toState.name);
      });
  });

  app.controller('DinerCtrl', function ($scope) {
    $scope.name = 'Volkmann';
  });

  app.controller('MealCtrl', function ($scope, $rootScope, $state, $timeout) {
    // This demonstrates changing state from code.
    // It changes to the "lunch" state after two seconds.
    // To use it, specify this as the controller for one or more of the states.
    $timeout(function () {
      $state.go('lunch');
    }, 2000);
  });

  app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/dinner');

    $stateProvider
      .state('breakfast', {
        url: '/breakfast',
        //controller: 'MealCtrl',
        templateUrl: 'partials/breakfast.html'
      })
      .state('breakfast.omelette', {
        url: '/omelette',
        templateUrl: 'partials/breakfast.omelette.html'
      })
      .state('lunch', {
        url: '/lunch',
        //controller: 'MealCtrl',
        templateUrl: 'partials/lunch.html'
      })
      .state('lunch.pizza', {
        url: '/pizza',
        templateUrl: 'partials/lunch.pizza.html'
      })
      .state('dinner', {
        url: '/dinner',
        //controller: 'MealCtrl',
        templateUrl: 'partials/dinner.html'
      })
      .state('dinner.pizza', {
        url: '/pizza',
        templateUrl: 'partials/dinner.pizza.html'
      })
      .state('dinner.spaghetti', {
        url: '/spaghetti',
        templateUrl: 'partials/dinner.spaghetti.html'
      });
  });
})();
