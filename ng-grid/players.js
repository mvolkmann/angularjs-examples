(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('MLB', ['ngGrid']);

  /*
  function camelCase(heading) {
    return heading.
      toLowerCase().
      split(' ').
      map(function (word, index) {
        return index === 0 ? word :
          word.charAt(0).toUpperCase() + word.substring(1);
      }).
      join('');
  }
  */

  app.controller('PlayerCtrl', function ($http, $scope) {
    $http.get('players.json').
      success(function (players) {
        console.log('players =', players);
        $scope.players = players;
      }).
      error(function (err) {
        alert('Error: ' + err);
      });

    $scope.gridOptions = {
      columnDefs: [
        {field: 'firstName', displayName: 'First Name'},
        {field: 'lastName', displayName: 'Last Name'},
        {field: 'teamCity', displayName: 'Team City'},
        {field: 'teamName', displayName: 'Team Name'},
        {field: 'battingAvg', displayName: 'Batting Avg'},
      ],
      data: 'players',
      filterOptions: {
        //filterText: 'go for it'
      },
      showFilter: true,
      showSelectionCheckbox: true,
    };
    /*
    $scope.headings = [
      'First Name', 'Last Name', 'Team City', 'Team Name', 'Batting Avg'
    ];

    $scope.keys = $scope.headings.map(camelCase);

    // Initial sort order.
    $scope.sortHeading = 'Last Name';
    $scope.sortKey = camelCase($scope.sortHeading);

    $scope.sortOn = function (heading) {
      $scope.reverse =
        heading === $scope.sortHeading && !$scope.reverse;
      $scope.sortHeading = heading;
      $scope.sortKey = camelCase(heading);
    };

    $scope.baFilter = function (player) {
      var minBatAvg = $scope.minBatAvg;
      return !minBatAvg || player.battingAvg >= minBatAvg;
    };
    */
  });
})();
