/*global angular: false */
(function () {
  'use strict';

  var module = angular.module('MyDirectives', []);

  /**
   * Example usage:
   * <div rmv-carousel images="myImages"></div>
   * where images is an arry on the scope
   * whose values are objects with these properties:
   * - full: a URL for the full-size image
   * - thumb: an optional URL for the thumbnail-size image
   * - url: a URL to open in a new window when the image is clicked
   */
  module.directive('rmvCarousel', function ($interval) {
    return {
      restrict: 'AE',
      templateUrl: 'carousel.html',
      replace: true,
      scope: {
        images: '=',
        imagesPerBatch: '@',
        secondsPerImage: '@',
        startLeft: '@'
      },
      link: function (scope) {
        var imagesPerBatch = Number(scope.imagesPerBatch);
        var startLeft = scope.startLeft ? Number(scope.startLeft) : 0;

        var count = scope.images.length;
        var currImg, currWidth;
        var main = document.getElementById('main');

        function loadImage(img) {
          var obj = scope.images[scope.index];
          img.src = obj.full;
          img.onclick = function () {
            window.open(obj.url, '_blank');
          };
        }

        function makeBatch() {
          var batch = [];
          scope.index = scope.batchNumber * imagesPerBatch;
          var lastIndex =
            Math.min(scope.index + imagesPerBatch, count);
          for (var i = scope.index; i < lastIndex; i++) {
            batch.push(scope.images[i]);
          }
          scope.batch = batch;
          scope.batchIndex = 0;
        }

        function makeImage() {
          var img = new Image();
          img.className = 'carousel-img';
          return img;
        }

        function nextImage() {
          // Create a new img element.
          var nextImg = makeImage();

          // When the transition ends ...
          function tranEnd() {
            // Remove the image that slid off the screen.
            currImg.removeEventListener('transitionend', tranEnd, false);
            currImg.parentNode.removeChild(currImg);

            // Make the next image be the current image.
            currImg = nextImg;

            // Record its width so the next image
            // can be placed to the right of it.
            currWidth = nextImg.width;
          }
          currImg.addEventListener('transitionend', tranEnd, false);

          // After the image has loaded ...
          nextImg.onload = function () {
            // Place the image to the right of the current one.
            nextImg.style.left = (startLeft + currWidth) + 'px';
            main.appendChild(nextImg);

            // Wait for the next turn in the event loop.
            setTimeout(function () {
              // Slide the current and next image to the left.
              currImg.style.left =
                (parseInt(currImg.style.left) - currWidth) + 'px';
              nextImg.style.left = startLeft + 'px';
            }, 15); // doesn't work in Firefox if <= 10
          };

          // Start loading the next image.
          loadImage(nextImg);
        }

        function advance() {
          var newBatch = false;

          scope.index++;
          if (scope.index === count) {
            // This is the last image.
            scope.batchNumber = 0;
            newBatch = true;
          } else if (scope.index % imagesPerBatch === 0) {
            // This is the first image in a new batch.
            scope.batchNumber++;
            newBatch = true;
          }

          if (newBatch) {
            makeBatch();
          } else {
            scope.batchIndex++; // advance to next in current batch
          }

          nextImage();
        }

        scope.nextBatch = function () {
          scope.batchNumber++;
          if (scope.batchNumber * imagesPerBatch >= count) {
            scope.batchNumber = scope.index = 0;
          }
          makeBatch();
        };

        scope.previousBatch = function () {
          if (scope.batchNumber === 0) {
            scope.batchNumber = Math.floor(count / imagesPerBatch);
          } else {
            scope.batchNumber--;
          }
          makeBatch();
        };

        scope.select = function (batchIndex) {
          scope.index =
            scope.batchNumber * imagesPerBatch + batchIndex;
          scope.batchIndex = batchIndex;
          nextImage();
        };

        scope.index = 0;

        // Create the first img element.
        currImg = makeImage();

        // After the image has loaded ...
        currImg.onload = function () {
          // Place the image at the starting location.
          currImg.style.left = startLeft + 'px';
          main.appendChild(currImg);

          // Record its width so the next image
          // can be placed to the right of it.
          currWidth = currImg.width;
        };

        // Start loading the first image.
        loadImage(currImg);

        scope.batchNumber = 0;
        makeBatch();

        $interval(advance, Number(scope.secondsPerImage) * 1000);
      }
    };
  });
})();
