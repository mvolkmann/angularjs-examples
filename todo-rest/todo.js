'use strict';
/*global angular: false */

var app = angular.module('Todo', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider.
    when('/active', {
      controller: 'TodoActiveCtrl',
      templateUrl: 'partials/active.html',
      view: 'main',
      resolve: {
        todos: function (todoSvc) {
          return todoSvc.retrieveActive();
        }
      }
    }).
    when('/archive', {
      controller: 'TodoArchiveCtrl',
      templateUrl: 'partials/archive.html',
      view: 'main',
      resolve: {
        archive: function (todoSvc) {
          return todoSvc.retrieveArchive();
        }
      }
    }).
    otherwise({
      redirectTo: '/active'
    });
});

app.factory('todoSvc', function ($http) {
  var svc = {};
  var urlPrefix = 'todo';

  svc.archive = function (id) {
    return $http.post(urlPrefix + '/' + id + '/archive');
  };

  svc.create = function (todo) {
    var options = {headers: {'Content-Type': 'application/json'}};
    return $http.post(urlPrefix, todo, options);
  };

  svc['delete'] = function (id) {
    return $http['delete'](urlPrefix + '/' + id);
  };

  svc.retrieve = function (id) {
    return $http.get(urlPrefix + '/' + id);
  };

  svc.retrieveActive = function () {
    return $http.get(urlPrefix);
  };

  svc.retrieveArchive = function () {
    return $http.get(urlPrefix + '/archive');
  };

  svc.update = function (todo) {
    return $http.put(urlPrefix + '/' + todo.id, todo);
  };

  return svc;
});

app.controller('TodoCtrl', function ($scope, $location) {
  $scope.changeView = function () {
    $location.path('/' + $scope.otherView.toLowerCase());
  };
});

app.controller('TodoActiveCtrl', function ($scope, todoSvc, todos) {
  $scope.todos = todos.data;
  $scope.$parent.otherView = 'Archive';

  function errorCb(err) {
    alert('Error in todoSvc: ' + err);
  }

  $scope.archiveCompleted = function () {
    Object.keys($scope.todos).forEach(function (id) {
      var todo = $scope.todos[id];
      if (todo.done) {
        todoSvc.archive(id).
          success(function () { delete $scope.todos[id]; }).
          error(errorCb);
      }
    });
  };

  $scope.createTodo = function () {
    var todo = {text: $scope.todoText, done: false};
    todoSvc.create(todo).
      success(function (resourceUrl) {
        // Get id assigned to new todo from resource URL.
        var index = resourceUrl.lastIndexOf('/');
        todo.id = resourceUrl.substring(index + 1);

        $scope.todos[todo.id] = todo; // add todo to active UI
        $scope.todoText = ''; // clear input field
      }).
      error(errorCb);
  };

  $scope.deleteTodo = function (id) {
    todoSvc['delete'](id).
      success(function () { delete $scope.todos[id]; }).
      error(errorCb);
  };

  $scope.getUncompletedCount = function () {
    var count = 0;
    // Iterate through object property values.
    angular.forEach($scope.todos, function (todo) {
      if (!todo.done) count++;
    });
    return count;
  };

  $scope.getTotalCount = function () {
    return Object.keys($scope.todos).length;
  };

  $scope.updateTodo = function (todo) {
    todoSvc.update(todo).
      success(angular.noop).
      error(errorCb);
  };
});

app.controller('TodoArchiveCtrl', function ($scope, archive) {
  $scope.archive = archive.data;
  $scope.$parent.otherView = 'Active';
});

// The orderBy filter only works with arrays,
// not object property values.
// This is a custom filter that takes an object
// and returns an array of its property values.
// Use it before orderBy to sort object property values.
app.filter('objToArr', function() {
  return function (obj) {
    if (!angular.isObject(obj)) return [];
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  };
});
