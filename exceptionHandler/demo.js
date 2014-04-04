'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

// Replace the default $exceptionHandler service.
app.factory('$exceptionHandler', function () {
  return function (exception, cause) {
    var msg = 'Boom!\n' + exception.message;
    if (cause) msg += '\n' + cause;
    alert(msg);
  };
});

app.controller('DemoCtrl', function () {
  throw new Error('DemoCtrl did something bad.');
});
