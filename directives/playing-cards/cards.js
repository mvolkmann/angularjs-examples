'use strict';
/*global angular: false */

var app = angular.module('CardGame', ['GameDirectives']);

app.controller('CardGameCtrl', function ($scope, playingCardSvc) {
  $scope.deal = function () {
    $scope.hand = playingCardSvc.dealHand(5);
  };

  $scope.newDeck = function () {
    playingCardSvc.newDeck();
    $scope.deal();
  };

  $scope.deal();
});
