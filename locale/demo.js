(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('Demo', ['Locale']);

  app.controller('DemoCtrl', function ($scope, localeSvc) {
    $scope.$watch('lang', function (lang) { // causes digest cycle
      localeSvc.setLang(lang);
    });

    $scope.lang = localeSvc.getDefaultLang();

    $scope.bigNumber = 1234567.8901234;
    $scope.price = 1234.56;
    $scope.birthday = new Date(1961, 3, 16);
    var lunchTime = new Date();
    lunchTime.setHours(11);
    lunchTime.setMinutes(30);
    $scope.lunchTime = lunchTime;
  });
})();
