(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('MyApp', []);

  app.controller('MyCtrl', function ($scope, mySvc) {
    // Can't use a cross-domain URL unless
    // server includes a header to allow it.
    var url = 'foo.html';

    mySvc.getTitle(url).then(
      function (title) { $scope.title = title; },
      function (err) { alert(err); });

    /*
    mySvc.getTitle2($scope, url).then(
      function (title) { $scope.title = title; },
      function (err) { alert(url + ' ' + err); });
    */

    mySvc.getContent(url).
      success(function (content) {
        console.log('success content =', content);
      }).
      error(function (err) { console.log('error err =', err); });

    mySvc.getContent(url).then(
      function (res) { console.log('then content =', res.data, 'res =', res); },
      function (res) { console.log('then error =', res.data); });

    mySvc.addOne(10).
      // The function passed to then on the next line returns a promise.
      then(function (result) { return mySvc.addOne(result); }).
      // This ia another way to write the previous line.
      then(mySvc.addOne.bind(mySvc)).
      // Process final result which will be 13.
      then(
        function (result) { console.log('result =', result); },
        function (err) { alert(err); });
  });

  app.factory('mySvc', function ($http, $q, $timeout) {
    var svc = {};

    svc.addOne = function (value) {
      console.log('addOne: value =', value);
      var dfr = $q.defer();
      $timeout(function () {
        if (value > 20) {
          dfr.reject('too high');
        } else {
          dfr.resolve(value + 1);
        }
      }, 100);
      return dfr.promise;
    };

    svc.getContent = function (url) {
      return $http.get(url);
    };

    // Gets the title from the HTML document at the given URL.
    svc.getTitle = function (url) {
      var dfr = $q.defer();

      // Gets the title from the HTML document at the given URL.
      $http.get(url).then(
        function (res) {
          // Get title text from response HTML using DOM XML parser and XPath.
          var parser = new DOMParser();
          // Chrome and Safari do not yet support 'text/html'.
          var doc = parser.parseFromString(res.data, 'text/xml');
          var title = doc.evaluate(
            '/html/head/title/text()', doc, null, XPathResult.STRING_TYPE);
          dfr.resolve(title.stringValue);
        },
        function (err) {
          //console.log('err =', err);
          dfr.reject(err.data);
        });

      return dfr.promise;
    };

    svc.getTitle2 = function (scope, url) {
      var dfr = $q.defer();

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true); // true for async
      xhr.onreadystatechange = function () {
        if (xhr.status !== 200) {
          // If dfr methods are not called within a $apply function,
          // the promise callbacks will never fire!
          scope.$apply(function () {
            dfr.reject(xhr.statusText);
          });
        } else if (xhr.readyState === 4) {
          // Get title text from response HTML using DOM XML parser and XPath.
          var parser = new DOMParser();
          // Chrome and Safari do not yet support 'text/html'.
          var doc = parser.parseFromString(xhr.responseText, 'text/xml');
          var title = doc.evaluate(
            '/html/head/title/text()', doc, null, XPathResult.STRING_TYPE);

          // If dfr methods are not called within a $apply function,
          // the promise callbacks will never fire!
          scope.$apply(function () {
            dfr.resolve(title.stringValue);
          });
        }
      };
      xhr.send();

      return dfr.promise;
    };

    return svc;
  });
})();
