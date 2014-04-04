(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('CatalogApp', ['ngRoute']);

  app.factory('catalogSvc', function ($q, $timeout) {
    var svc = {};

    svc.getColors = function () {
      var dfr = $q.defer();
      // Simulate an async Ajax request.
      $timeout(function () {
        var colors = ['red', 'blue', 'green'];
        dfr.resolve(colors);
      }, 500);
      return dfr.promise;
    };

    svc.getShapes = function () {
      var dfr = $q.defer();
      // Simulate an async Ajax request.
      $timeout(function () {
        var shapes = ['square', 'circle', 'triangle'];
        dfr.resolve(shapes);
      }, 300);
      return dfr.promise;
    };

    return svc;
  });

  app.controller('CatalogCtrl', function ($scope, colors, shapes) {
  //app.controller('CatalogCtrl', function ($scope, catalogSvc) {
    $scope.colors = colors;
    $scope.shapes = shapes;
    //catalogSvc.getColors().then(
    //  function (colors) { $scope.colors = colors; });
    //catalogSvc.getShapes().then(
    //  function (shapes) { $scope.shapes = shapes; });
  });

  var catalogResolve = {
    colors: function (catalogSvc) {
      return catalogSvc.getColors();
    },
    shapes: function (catalogSvc) {
      return catalogSvc.getShapes();
    }
  };

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/catalog', {
        // controller must be specified here instead of in catalog.html
        controller: 'CatalogCtrl',
        templateUrl: 'catalog.html',
        view: 'center',
        resolve: catalogResolve
      })
      .otherwise({
        redirectTo: '/catalog'
      });
  });
})();
