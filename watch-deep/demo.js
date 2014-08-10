'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($scope) {
  var descElem;

  $scope.cart = [];

  $scope.addToCart = function () {
    $scope.cart.push({
      description: $scope.description,
      price: $scope.price
    });
    $scope.description = $scope.price = '';
    $scope.orderForm.$setPristine();
    if (!descElem) descElem = document.getElementById('description');
    descElem.focus();
  };

  $scope.dec = function (item) { item.price--; };

  $scope.inc = function (item) { item.price++; };

  $scope.$watch('cart', function () {
    $scope.total = $scope.cart.reduce(function (total, item) {
      return total + item.price;
    }, 0);
  }, true); // true for deep
});
