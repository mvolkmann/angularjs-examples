(function () {
  'use strict';
  /*global angular: false, DTNodeStatus_Ok: false */

  var app = angular.module('MyApp');

  /**
   * This is an AngularJS directive that wraps a subset
   * of the functionality of the jQuery Dynatree widget.
   * See https://code.google.com/p/dynatree.
   * It depends on jQuery UI core which depends on jQuery.
   */
  app.directive('dynatree', function () {
    function massageNode(node) {
      // Nodes are assumed to be parent nodes
      // unless they contain the "leaf" property.
      if (!node.leaf) node.isFolder = node.isLazy = true;
    }

    function link(scope, element) {
      function getInitialNodes() {
        var nodes = scope.initialNodes();
        nodes.forEach(massageNode);
        return nodes;
      }

      function onLazyRead(node) {
        var nodes = scope.childNodes(node);
        nodes.forEach(massageNode);
        node.addChild(nodes);
        // Tell Dynatree we are finished adding children to this lazy node.
        node.setLazyNodeStatus(DTNodeStatus_Ok);
      }

      element.dynatree({
        children: getInitialNodes(),
        onActivate: scope.activate,
        onLazyRead: onLazyRead
      });
    }

    return {
      restrict: 'AE',
      link: link,
      scope: {
        activate: '=',
        childNodes: '=',
        initialNodes: '='
      }
    };
  });
})();
