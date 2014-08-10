(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('CatalogApp', ['ngRoute']);

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

  app.factory('catalogSvc', function ($q, $timeout) {
    var svc = {};

    svc.getColors = function () {
      return $timeout(function () {
        return ['red', 'blue', 'green'];
      }, 500);
    };

    svc.getShapes = function () {
      return $timeout(function () {
        return ['square', 'circle', 'triangle'];
      }, 300);
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
})();
