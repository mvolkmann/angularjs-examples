(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('Demo', ['MyDirectives']);

  app.controller('DemoCtrl', function ($scope) {
    function setBgColor(color) {
      $scope.bodyStyle = {backgroundColor: color};
    }

    $scope.myBtnMap = {
      'Red': function () { setBgColor('red'); },
      'Green': function () { setBgColor('green'); },
      'Blue': setBgColor.bind(null, 'blue') // different way to write
    };
  });
})();
