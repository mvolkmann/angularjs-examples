(function () {
  'use strict';

  var app = angular.module('Weather', ['ui.router']);

  app.factory('stateSvc', function ($rootScope) {
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
        'but that state is not defined');
    });
    $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, fromState, fromParams, error) {
        console.log(error, 'changing state from',
          fromState.name, 'to', toState.name);
      });
  });

  app.factory('weatherSvc', function () {
    var svc = {};

    svc.getHourlyForecasts = function () {
      var forecasts = [];
      forecasts.push({hour:  '8am', temperature: 50});
      forecasts.push({hour:  '9am', temperature: 49});
      forecasts.push({hour: '10am', temperature: 52});
      forecasts.push({hour: '11am', temperature: 57});
      forecasts.push({hour: '12pm', temperature: 64});
      forecasts.push({hour:  '1pm', temperature: 70});
      return forecasts;
    };

    svc.getDailyForecasts = function () {
      var forecasts = [];
      forecasts.push({day: 'Monday', high: 75, low: 42});
      forecasts.push({day: 'Tuesday', high: 77, low: 47});
      forecasts.push({day: 'Wednesday', high: 80, low: 61});
      forecasts.push({day: 'Thursday', high: 72, low: 56});
      forecasts.push({day: 'Friday', high: 60, low: 32});
      return forecasts;
    };

    return svc;
  });

  app.controller('WeatherCtrl', function ($scope, weatherSvc, stateSvc) {
    $scope.hourForecasts = weatherSvc.getHourlyForecasts();
    $scope.dayForecasts = weatherSvc.getDailyForecasts();
  });

  app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/daily');

    $stateProvider
      .state('hourly', {
        url: '/hourly',
        controller: 'WeatherCtrl',
        templateUrl: 'partials/hourly.html'
      })
      .state('daily', {
        url: '/daily',
        controller: 'WeatherCtrl',
        templateUrl: 'partials/daily.html'
      });
  });
})();
