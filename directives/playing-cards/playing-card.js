/*global angular: false */
(function () {
  'use strict';

  // ngSanitize module defines ng-bind-html directive.
  var module = angular.module('GameDirectives', ['ngSanitize']);

  /**
   * Randomize array element order in-place
   * using Fisher-Yates shuffle algorithm.
   */
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  var deck = [];
  var ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  var suits = ['spades', 'hearts', 'diamonds', 'clubs'];

  module.factory('playingCardSvc', function () {
    var svc = {};

    svc.dealCard = function () {
      return deck.pop();
    };

    svc.dealHand = function (count) {
      var hand = [];
      for (var i = 0; i < count; i++) {
        var card = svc.dealCard();
        if (card) hand.push(card);
      }
      return hand;
    };

    svc.newDeck = function () {
      deck = [];
      suits.forEach(function (suit) {
        ranks.forEach(function (rank) {
          deck.push({rank: rank, suit: suit});
        });
      });
      shuffleArray(deck);
    };

    svc.newDeck();

    return svc;
  });

  module.directive('playingCard', function () {
    return {
      // ng-bind-html avoids escaping content
      // so character entities can be displayed.
      // Those are used for suit characters.
      template: '<div class="playing-card" style="color:{{color}}"' +
        ' ng-bind-html="content"></div>',
      replace: true,
      scope: {
        playingCard: '='
      },
      link: function (scope) {
        var suit = scope.playingCard.suit;
        scope.color = suit === 'hearts' || suit === 'diamonds' ?
          'red' : 'black';
        if (suit === 'diamonds') suit = 'diams'; // unicode name

        scope.content = scope.playingCard.rank + '<br>&' + suit + ';';
      }
    };
  });
})();
