'use strict';
/*global angular: false */

var app = angular.module('Todo', []);

app.controller('TodoCtrl', function ($scope) {
  $scope.todos = [
    {text: 'learn AngularJS', done: true},
    {text: 'build an AngularJS app', done: false}
  ];

  $scope.addTodo = function () {
    $scope.todos.push({text: $scope.todoText, done: false});
    $scope.todoText = ''; // clears input
  };

  $scope.archiveCompleted = function () {
    // Not saving completed todos in this version.
    $scope.todos = $scope.todos.filter(function (t) { return !t.done; });
  };

  $scope.deleteTodo = function (todo) {
    $scope.todos = $scope.todos.filter(function (t) { return t !== todo; });
  };

  $scope.getUncompletedCount = function () {
    return $scope.todos.reduce(function (count, todo) {
      return todo.done ? count : count + 1;
    }, 0);
  };
});
