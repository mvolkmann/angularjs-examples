'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

var listener = function (event, bool, num, text) {
  console.log('event "' + event.name +
    '" with args', bool, num, text,
    'originated from', event.targetScope.$id,
    'and was received at', event.currentScope.$id);
};

function setupScope($scope) {
  $scope.broadcastDemo = function () {
    $scope.$broadcast('down', false, 1, 'foo');
  };
  $scope.emitDemo = function () {
    $scope.$emit('up', true, 2, 'bar');
  };

  var downStop = $scope.$on('down', listener);
  setTimeout(function () {
    downStop();
    console.log('stopped listening for down');
  }, 5000);

  var upStop = $scope.$on('up', listener);
  setTimeout(function () {
    upStop();
    console.log('stopped listening for up');
  }, 10000);
}

app.controller('GrandparentCtrl', setupScope);
app.controller('ParentCtrl', setupScope);
app.controller('ChildCtrl', setupScope);
