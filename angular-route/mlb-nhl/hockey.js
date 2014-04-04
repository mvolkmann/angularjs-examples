(function () {
  'use strict';
  /*global $: false, angular: false */

  var app = angular.module('RoutesDemo');

  var east = {
    Atlantic: {
      Penguins: 'Pittsburgh',
      Rangers: 'New York',
      Islanders: 'New York',
      Flyers: 'Philadelphia',
      Devils: 'New Jersey'
    },
    Northeast: {
      Canadiens: 'Montreal',
      Bruins: 'Boston',
      'Maple Leafs': 'Toronto',
      Senators: 'Ottawa',
      Sabres: 'Buffalo'
    },
    Southeast: {
      Capitals: 'Washington',
      Jets: 'Winnipeg',
      Hurricanes: 'Carolina',
      Lightning: 'Tampa Bay',
      Panthers: 'Florida'
    }
  };

  var west = {
    Central: {
      Blackhawks: 'Chicago',
      Blues: 'St. Louis',
      'Red Wings': 'Detroit',
      'Blue Jackets': 'Columbus',
      Predators: 'Nashville'
    },
    Northwest: {
      Canucks: 'Vancouver',
      Wild: 'Minnesota',
      Oilers: 'Edmonton',
      Flames: 'Calgary',
      Avalanche: 'Colorado'
    },
    Pacific: {
      Ducks: 'Aneheim',
      Kings: 'Los Angeles',
      Sharks: 'San Jose',
      Coyotes: 'Phoenix',
      Stars: 'Dallas'
    }
  };

  app.controller('HockeyCtrl', function ($routeParams, $scope, hockeySvc) {
    console.log('$routeParams =', $routeParams);
    $scope.conferences =
      hockeySvc.getTeams($routeParams.conference);

    $scope.teamClicked = function ($event) {
      var leaf = $($event.currentTarget);
      var city = leaf.children('.team-city').text();
      var name = leaf.children('.team-name').text();
      console.log('You selected', city, name);
    };
  });

  app.factory('hockeySvc', function () {
    var svc = {};

    svc.getTeams = function (conference) {
      var teams = {};
      if (!conference || conference === 'west') {
        teams.Western = west;
      }
      if (!conference || conference === 'east') {
        teams.Eastern = east;
      }
      return teams;
    };

    return svc;
  });
})();
