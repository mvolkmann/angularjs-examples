(function () {
  'use strict';
  /*global angular: false */
  
  // Create a module just to use for testing module dependencies.
  angular.module('OtherModule', []);

  var app = angular.module('KarmaDemo', ['ngRoute', 'OtherModule']);

  app.factory('demoSvc', function ($http) {
    var svc = {};

    svc.getContent = function (url) {
      return $http.get(url);
    };

    svc.increment = function (number) {
      return number + 1;
    };

    return svc;
  });

  app.controller('DemoCtrl', function ($scope, $location, demoSvc) {
    $scope.number = 1;

    $scope.increment = function () {
      $scope.number = demoSvc.increment($scope.number);
      var isEven = $scope.number % 2 === 0;
      $location.path('/' + (isEven ? 'even' : 'odd'));
    };

    $scope.myAddress = {
      street: '644 Glen Summit',
      city: 'St. Charles',
      state: 'MO',
      zip: 63304
    };

    demoSvc.getContent('http://localhost:3000').
      success(function (data) {
        console.log('data =', data);
      }).
      error(function (data) {
        throw new Error('error: ' + data);
      });
  });

  // These empty controllers are only used to test that the
  // routes associate the correct controller with a view.
  app.controller('EvenFooterCtrl', function () {});
  app.controller('OddFooterCtrl', function () {});

  app.directive('evenOddClass', function () {
    var evenClass, oddClass;

    function evaluate(value, element) {
      //console.log('karma-demo evaluate: value =', value);
      if (value % 2 === 0) {
        element.removeClass(oddClass);
        element.addClass(evenClass);
      } else {
        element.removeClass(evenClass);
        element.addClass(oddClass);
      }
    }

    return {
      scope: {
        evenOddExpr: '&'
      },
      restrict: 'A',
      link: function (scope, element, attrs) {
        var classNames = attrs.evenOddClass.split(',');
        evenClass = classNames[0];
        oddClass = classNames[1];
        
        scope.$watch(scope.evenOddExpr, function (newValue) {
          //console.log('karma-demo watch: newValue =', newValue);
          evaluate(newValue, element);
        });

        evaluate(scope.evenOddExpr, element);
      }
    };
  });

  app.directive('addressLabel', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/address.html',
      scope: {
        address: '='
      }
    };
  });
  
  app.filter('asWord', function () {
    return function (number) {
      return number === 1 ? 'one' :
        number === 2 ? 'two' :
        number === 3 ? 'three' :
        number;
    };
  });

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/even', {
        'controller': 'EvenFooterCtrl',
        'templateUrl': 'partials/evenFooter.html',
        'view': 'footer'
      })
      .when('/odd', {
        'controller': 'OddFooterCtrl',
        'templateUrl': 'partials/oddFooter.html',
        'view': 'footer'
      })
      .otherwise({
        redirectTo: '/odd'
      });
  });
})();
