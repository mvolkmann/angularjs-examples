'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

var fruitArr = [
  {name: 'strawberry', color: 'red', size: 'small'},
  {name: 'cherry', color: 'red', size: 'small'},
  {name: 'apple', color: 'red', size: 'medium'},
  {name: 'peach', color: 'orange', size: 'medium'},
  {name: 'orange', color: 'orange', size: 'medium'},
  {name: 'grapefruit', color: 'yellow', size: 'large'},
  {name: 'banana', color: 'yellow', size: 'medium'},
  {name: 'lime', color: 'green', size: 'medium'},
  {name: 'kiwi', color: 'green', size: 'small'},
  {name: 'blueberry', color: 'blue', size: 'small'},
  {name: 'grape', color: 'purple', size: 'small'}
];

var fruitMap = {};
fruitArr.forEach(function (fruit) {
  fruitMap[fruit.name] = fruit;
});

app.controller('DemoCtrl', function ($scope) {
  $scope.fruitArr = fruitArr;
  $scope.fruitMap = fruitMap;

  var firstFruit = fruitArr[0];
  $scope.selectedFruit = firstFruit;
  $scope.selectedFruitColor = firstFruit.color;
  $scope.selectedFruitName = firstFruit.name;
});
