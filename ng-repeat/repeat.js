(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('Repeat', []);

  app.controller('RepeatCtrl',
    function ($http, $scope) {
      $http.get('fruit.json').
        success(function (fruits) {
          $scope.fruits = fruits;
        }).
        error(function (err) {
          alert('Error: ' + err);
        });
    });
})();
