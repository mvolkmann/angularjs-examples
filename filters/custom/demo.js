(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('Demo', []);

  app.filter('capWords', function () {
    return function (str) {
      if (typeof str !== 'string') str = str.toString();
      if (str.length === 0) return str;
      return str.charAt(0).toUpperCase() +
        str.substring(1).toLowerCase().
        replace(/ [a-z]/g, function (s) { return s.toUpperCase(); });

      /* alternate implementation
      return str.toLowerCase()
        split(' ').
        map(function (part) {
        return part.charAt(0).toUpperCase() +
          part.substring(1);
      }).
      join(' ');
      */
    };
  });

  app.controller('DemoCtrl', function ($scope, capWordsFilter, $filter) {
    var title = 'gone with the wind';
    $scope.movie = {title: title};
    $scope.fromCode1 = capWordsFilter(title);
    var fn = $filter('capWords');
    $scope.fromCode2 = fn(title);
  });
})();
