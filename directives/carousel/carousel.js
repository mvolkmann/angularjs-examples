/*global angular: false */
/*eslint no-use-before-define: 0 */
(function () {
  'use strict';

  var module = angular.module('MyDirectives', []);

  function link(scope, $interval) {
    var batchDiv, batchImages, batchIndex = 0, batchNumber = 0,
      count, currImg, currWidth, imagesPerBatch, innerDiv, mainDiv,
      timerReset = false;

    // The following functions are nested inside the link function
    // so they can share its local variables.

    function advance() {
      if (timerReset) {
        timerReset = false;
        return;
      }

      var newBatch = false;

      scope.index++;
      if (scope.index === count) {
        // This is the last image.
        batchNumber = 0;
        newBatch = true;
      } else if (scope.index % imagesPerBatch === 0) {
        // This is the first image in a new batch.
        batchNumber++;
        newBatch = true;
      }

      // Remove selection indicator from current thumbnail.
      batchImages[batchIndex].className = 'carousel-thumb';

      if (newBatch) {
        makeBatch();
      } else {
        batchIndex++; // advance to next thumbnail in current batch
        // Add selection indicator to new thumbnail.
        batchImages[batchIndex].className += ' current-image';
        updateFullImage();
      }
    }

    function createFirstImage() {
      // Create the first img element.
      currImg = makeFullImage();

      // After the image has loaded ...
      currImg.onload = function () {
        // Place the image at the starting location.
        currImg.style.left = '0px';
        mainDiv.appendChild(currImg);

        // Record its width so the next image
        // can be placed to the right of it.
        currWidth = currImg.width;
      };

      // Start loading the first image.
      loadFullImage(currImg);
    }

    function loadFullImage(img) {
      var obj = scope.images[scope.index];
      img.src = obj.full;
      if (obj.url) {
        img.onclick = function () {
          window.open(obj.url, '_blank');
        };
      }
    }

    function main() {
      count = scope.images.length;
      imagesPerBatch = Number(scope.imagesPerBatch) || 5;
      innerDiv = document.querySelector('.thumbs-inner');
      mainDiv = document.querySelector('.carousel-main');

      scope.nextBatch = function () {
        timerReset = true;
        batchNumber++;
        if (batchNumber * imagesPerBatch >= count) {
          batchNumber = 0; // first batch
        }
        makeBatch();
      };

      scope.previousBatch = function () {
        timerReset = true;
        if (batchNumber === 0) {
          batchNumber = Math.floor(count / imagesPerBatch); // last batch
        } else {
          batchNumber--;
        }
        makeBatch();
      };

      scope.index = 0;
      createFirstImage();
      makeBatch();
    }

    function makeBatch() {
      batchImages = [];

      // Create a div to hold the next batch of thumbnails.
      var newBatchDiv = document.createElement('div');
      newBatchDiv.className = 'thumb-batch';

      // Create an img element for each thumbnail in this batch
      // and add to the new div.
      scope.index = batchNumber * imagesPerBatch;
      var lastIndex =
        Math.min(scope.index + imagesPerBatch, count);
      for (var i = scope.index; i < lastIndex; i++) {
        var img = makeThumbImage(i);
        batchImages.push(img);

        // Create a div to hold this img element.
        var imgDiv = document.createElement('div');
        imgDiv.appendChild(img);
        newBatchDiv.appendChild(imgDiv);
      }

      // The first image in the batch is the current one.
      batchImages[0].className += ' current-image';

      // Remember the width of the previous batch for later.
      var delta = batchDiv ? getComputedStyle(batchDiv).width : 0;

      function tranEnd() {
        batchDiv.removeEventListener('transitionend', tranEnd, false);

        // Remove the batch that slid off the screen.
        innerDiv.removeChild(batchDiv);
        batchDiv = newBatchDiv;
      }

      // If there was a previous batch ...
      if (batchDiv) {
        // Add the new batch to the right of the current one.
        newBatchDiv.style.left = delta;
        innerDiv.appendChild(newBatchDiv);

        // Call tranEnd above when the transition of the previous batch ends.
        batchDiv.addEventListener('transitionend', tranEnd, false);

        // Wait for the next turn in the event loop.
        setTimeout(function () {
          // Slide the previous batch out of view.
          batchDiv.style.left = '-' + delta;

          // Slide the new batch into view.
          newBatchDiv.style.left = '0px';

          updateFullImage();
        }, 150); // doesn't work in Firefox if <= 10
      } else {
        batchDiv = newBatchDiv;
        batchDiv.style.left = '0px';
        innerDiv.appendChild(batchDiv);
      }

      batchIndex = 0;
    }

    function makeFullImage() {
      var img = new Image();
      img.className = 'carousel-img';
      return img;
    }

    function makeThumbImage(index) {
      var img = new Image();
      img.className = 'carousel-thumb';
      var obj = scope.images[index];
      img.src = obj.thumb || obj.full;
      img.onclick = selectImage.bind(null, index);
      return img;
    }

    function selectImage(index) {
      timerReset = true;

      // Remove selection indicator from current thumbnail.
      batchImages[batchIndex].className = 'carousel-thumb';

      scope.index = index;
      batchIndex = index % imagesPerBatch;

      // Add selection indicator to new thumbnail.
      batchImages[batchIndex].className += ' current-image';

      updateFullImage();
    }

    function updateFullImage() {
      // Create a new img element.
      var nextImg = makeFullImage();

      // When the transition ends ...
      function tranEnd() {
        // Remove the image that slid off the screen.
        currImg.removeEventListener('transitionend', tranEnd, false);
        mainDiv.removeChild(currImg);

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
        nextImg.style.left = currWidth + 'px';
        mainDiv.appendChild(nextImg);

        // Wait for the next turn in the event loop.
        setTimeout(function () {
          // Slide the current and next image to the left.
          currImg.style.left = '-' + currWidth + 'px';
          nextImg.style.left = '0px';
        }, 15); // doesn't work in Firefox if <= 10
      };

      // Start loading the next image.
      loadFullImage(nextImg);
    }

    main();

    var seconds = Number(scope.secondsPerImage) || 2;
    $interval(advance, seconds * 1000);
  }

  /**
   * Example usage:
   * <div rmv-carousel images="myImages"
   *   imagesPerBatch="n" secondsPerImage="n"></div>
   *
   * images is an array on the scope
   * whose values are objects with these properties:
   * - full: URL for the full-size image
   * - thumb: optional URL for the thumbnail-size image
   * - url: optional URL to open in a new window when the image is clicked
   *
   * imagesPerBatch is the number of thumbnails to display
   * below the main image.  It defaults to 5.
   *
   * secondsPerImage is the number of seconds each image should be displayed
   * before advancing to the next.  It defaults to 2.
   */
  module.directive('rmvCarousel', function ($interval) {
    return {
      restrict: 'AE',
      templateUrl: 'carousel.html',
      replace: true,
      scope: {
        images: '=',
        imagesPerBatch: '@',
        secondsPerImage: '@'
      },
      link: function (scope) {
        link(scope, $interval);
      }
    };
  });
})();
