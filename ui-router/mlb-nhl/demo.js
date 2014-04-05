'use strict';
/*global $: false, angular: false */

var app = angular.module('RoutesDemo', ['ui.router', 'my-directives']);

app.config(function ($stateProvider) {
  $stateProvider
    .state('baseball', {
      url: '/baseball',
      views: {
        'center': {
          templateUrl: 'partials/baseball.html'
        },
        'logo': {
          templateUrl: 'partials/mlb.html'
        }
      }
    })
    .state('hockey', {
      url: '/hockey',
      views: {
        'center': {
          templateUrl: 'partials/hockey.html'
        },
        'logo': {
          templateUrl: 'partials/nhl.html'
        }
      }
    });
});

app.controller('NavCtrl', function ($scope, $location, $state) {
  var sport = $location.path().substring(1); // removes leading slash
  if (!sport) sport = 'baseball';

  var ul = $('ul.nav');

  function selectNavButton(sport) {
    ul.children('li.active').removeClass('active');
    ul.find('li > a#' + sport).parent().addClass('active');
  }

  $scope.setRoute = function (event) {
    event.preventDefault(); // IMPORTANT?
    sport = event.target.id;
    console.log('sport =', sport);
    selectNavButton(sport);
    $location.path('/' + sport);
  };

  $state.transitionTo(sport); // sets the initial state
  selectNavButton(sport);
});
