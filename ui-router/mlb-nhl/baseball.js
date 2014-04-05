'use strict';
/*global app: false */

app.controller('BaseballCtrl', function ($scope, baseballSvc) {
  $scope.teams = baseballSvc.getTeams();
});

app.factory('baseballSvc', function () {
  var svc = {};

  svc.getTeams = function () {
    return {
      'Red Sox': {
        name: 'Red Sox',
        city: 'Boston'
      },
      Yankees: {
        city: 'New York',
        name: 'Yankees'
      },
      Orioles: {
        city: 'Baltimore',
        name: 'Orioles'
      },
      Buccaneers: {
        city: 'Tampa Bay',
        name: 'Buccaneers'
      },
      'Blue Jays': {
        city: 'Toronto',
        name: 'Blue Jays'
      },
      Tigers: {
        city: 'Detroit',
        name: 'Tigers'
      },
      Indians: {
        city: 'Cleveland',
        name: 'Indians'
      },
      Royals: {
        city: 'Kansas City',
        name: 'Royals'
      },
      Twins: {
        city: 'Minnesota',
        name: 'Twins'
      },
      'White Sox': {
        city: 'Chicago',
        name: 'White Sox'
      },
      Rangers: {
        city: 'Texas',
        name: 'Rangers'
      },
      Athletics: {
        city: 'Oakland',
        name: 'Athletics'
      },
      Angels: {
        city: 'Los Angeles',
        name: 'Angels'
      },
      Mariners: {
        city: 'Seattle',
        name: 'Mariners'
      },
      Astros: {
        city: 'Houston',
        name: 'Astros'
      },
      Braves: {
        city: 'Atlanta',
        name: 'Braves'
      },
      Nationals: {
        city: 'Washington',
        name: 'Nationals'
      },
      Phillies: {
        city: 'Philadelphia',
        name: 'Phillies'
      },
      Mets: {
        city: 'New York',
        name: 'Mets'
      },
      Marlins: {
        city: 'Miami',
        name: 'Marlins'
      },
      Cardinals: {
        city: 'St. Louis',
        name: 'Cardinals'
      },
      Reds: {
        city: 'Cincinnati',
        name: 'Reds'
      },
      Pirates: {
        city: 'Pittsburgh',
        name: 'Pirates'
      },
      Cubs: {
        city: 'Chicago',
        name: 'Cubs'
      },
      Brewers: {
        city: 'Milwaukee',
        name: 'Brewers'
      },
      Diamondbacks: {
        city: 'Arizona',
        name: 'Diamondbacks'
      },
      Giants: {
        city: 'San Francisco',
        name: 'Giants'
      },
      Rockies: {
        city: 'Colorado',
        name: 'Rockies'
      },
      Padres: {
        city: 'San Diego',
        name: 'Padres'
      },
      Dodgers: {
        city: 'Los Angeles',
        name: 'Dodgers'
      }
    };
  };

  return svc;
});
