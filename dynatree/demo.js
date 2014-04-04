(function () {
  'use strict';
  /*global angular: false */

  // This is data that could be retrieved via a REST service call.
  var leagues = {
    American: {
      East: [
        'Baltimore Orioles',
        'Boston Red Sox',
        'New York Yankees',
        'Tampa Bay Rays',
        'Toronto Blue Jays'
      ],
      Central: [
        'Cleveland Indians',
        'Detroit Tigers'
      ],
      West: [
        'Oakland Athletics',
        'Texas Rangers'
      ]
    },
    National: {
      East: [
        'Atlanta Braves',
        'Washington Nationals'
      ],
      Central: [
        'Chicago Cubs',
        'St. Louis Cardinals'
      ],
      West: [
        'Los Angeles Dodgers',
        'Arizona Diamondbacks'
      ]
    }
  };

  var app = angular.module('MyApp', []);

  app.controller('MyCtrl', function ($scope) {

    function getDivisions(league) {
      var names = Object.keys(leagues[league]);
      return names.sort().map(function (name) {
        return {title: name, kind: 'division'};
      });
    }

    function getTeams(league, division) {
      var names = leagues[league][division];
      return names.sort().map(function (name) {
        // The isLeaf property is used in dynatree-directive.js.
        return {title: name, kind: 'team', leaf: true};
      });
    }

    $scope.getChildNodes = function (node) {
      var league;

      switch (node.data.kind) {
      case 'league':
        league = node.data.title;
        return getDivisions(league);
      case 'division':
        league = node.parent.data.title;
        var division = node.data.title;
        return getTeams(league, division);
      }
    };

    $scope.getLeagues = function () {
      var names = Object.keys(leagues).sort();
      return names.sort().map(function (name) {
        return {title: name, kind: 'league'};
      });
    };

    $scope.selected = function (node) {
      var name = node.data.title;
      console.log('you selected', name);
    };
  });
})();
