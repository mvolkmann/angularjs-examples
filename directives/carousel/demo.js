(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('Demo', ['MyDirectives']);

  app.controller('DemoCtrl', function ($scope, $timeout) {
    $scope.myImages = [
      {
        full: 'images/whippet1.jpg',
        thumb: null,
        url: 'http://ociweb.com/sett'
      },
      {
        full: 'images/whippet2.jpg',
        thumb: null,
        url: 'http://ociweb.com/sett'
      },
      {
        full: 'images/whippet3.jpg',
        thumb: null,
        url: 'http://ociweb.com/sett'
      },
      {
        full: 'images/whippet4.jpg',
        thumb: null,
        url: 'http://ociweb.com/sett'
      },
      {
        full: 'images/whippet5.jpg',
        thumb: null,
        url: 'http://ociweb.com/sett'
      },
      {
        full: 'images/whippet6.jpg',
        thumb: null,
        url: 'http://ociweb.com/sett'
      },
      {
        full: 'images/whippet7.jpg',
        thumb: null,
        url: 'http://ociweb.com/sett'
      },
      {
        full: 'images/whippet8.jpg',
        thumb: null,
        url: 'http://ociweb.com/sett'
      }
    ];
  });
})();
