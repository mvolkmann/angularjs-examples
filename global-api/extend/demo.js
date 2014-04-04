'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

var src1 = {
  foo: 1,
  bar: 1
};

var src2 = {
  bar: 2,
  baz: 2
};

var dst = {
  bar: 3,
  baz: 3,
  qux: 3
};

angular.extend(dst, src1, src2);
console.log('dst =', dst);
