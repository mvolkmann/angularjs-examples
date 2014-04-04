(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('Demo', ['ngSanitize']);

  app.controller('DemoCtrl', function ($scope, $sce) {
    $scope.text1 = '<h1 style="color: red">One</h1>';
    $scope.text2 = $sce.trustAsHtml('<h1 style="color: red">Two</h1>');
  });

  /**
   * Prevents escaping of HTML.
   * Used in index-in.html to display HTML
   * from server-side errors in an error dialog.
   */
  app.filter('raw', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }]);
})();
