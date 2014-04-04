'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

app.controller('DemoCtrl', function ($cacheFactory, $log, $scope) {
  // Create cache.
  var cache = $cacheFactory('myCache', {capacity: 3});

  // At some point later, retrieve the cache.
  cache = $cacheFactory.get('myCache');

  cache.put('foo', 1);
  $log.log('foo =', cache.get('foo'));
  cache.put('bar', true);
  cache.put('baz', 'some text');
  cache.put('qux', {red: 1, green: 2});
  $log.log(cache.info());
  $log.log('foo =', cache.get('foo'));
});
