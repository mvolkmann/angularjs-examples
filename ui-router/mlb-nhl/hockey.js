'use strict';
/*global $: false, app: false */

app.controller('HockeyCtrl', function ($scope, hockeySvc) {
  $scope.conferences = hockeySvc.getConferences();

  $scope.teamClicked = function ($event) {
    var leaf = $($event.currentTarget);
    var city = leaf.children('.team-city').text();
    var name = leaf.children('.team-name').text();
    console.log('You selected', city, name);
  };
});

app.factory('hockeySvc', function () {
  var svc = {};

  svc.getConferences = function () {
    return {
      Eastern: {
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
      },
      Western: {
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
      }
    };
  };

  return svc;
});
