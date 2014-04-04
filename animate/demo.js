'use strict';
/*global angular: false */

var app = angular.module('Demo', []);

function addBtn(parent, html, clickCb) {
  var btn = angular.element('<button>');
  btn.html(html);
  btn.on('click', clickCb);
  parent.append(btn);
}

app.directive('listEditor', function ($animate, $sce) {
  return {
    replace: true,
    scope: {
      collection: '='
    },
    link: function (scope, parent) {
      var deleteHtml = $sce.trustAsHtml('&#x00d7;');
      var downHtml = $sce.trustAsHtml('&#x2193;');
      var upHtml = $sce.trustAsHtml('&#x02191;');

      scope.collection.forEach(function (item) {
        var div = angular.element('<div>');

        var input = angular.element('<input>');
        input.attr('type', 'text');
        input.attr('value', item.toString());
        div.append(input);

        addBtn(div, deleteHtml, function () {
          div.remove();
        });
        addBtn(div, upHtml, function () {
          // angular.element doesn't have a prev method, so this is messy.
          var sibling = div[0].previousSibling.previousSibling;
          if (sibling) {
            $animate.move(div, parent, angular.element(sibling));
          } else {
            parent.prepend(div);
          }
        });
        addBtn(div, downHtml, function () {
          $animate.move(div, parent, div.next());
        });

        //$animate.enter(el, parent);
        parent.append(div);
      });
    }
  };
});

app.controller('DemoCtrl', function ($sce, $scope) {
  $scope.colors = ['red', 'green', 'blue'];
  $scope.x = $sce.trustAsHtml('&#x00d7;');
});
