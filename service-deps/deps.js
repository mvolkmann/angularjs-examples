(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('ServiceDeps', []);

  app.factory('firstSvc', function (secondSvc) {
  });

  app.factory('secondSvc', function (thirdSvc, fourthSvc) {
  });

  app.factory('thirdSvc', function () {
  });

  app.factory('fourthSvc', function () {
  });

  app.controller('RepeatCtrl', function ($scope, firstSvc) {
  });
})();
