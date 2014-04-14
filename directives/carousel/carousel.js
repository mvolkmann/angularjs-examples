(function () {
  'use strict';
  /*global angular: false */

  var module = angular.module('MyDirectives', []);

  function link(scope, $interval) {
    var imageCount = scope.images.length,
      imagesPerBatch = Number(scope.imagesPerBatch) || 5,
      thumbImgs = [],
      timerReset = false;

    // This is a "descriptor" object for the full-size images
    // that display at the top.
    var fullDesc = {
      parentElement: document.querySelector('.carousel-main'),
      currentElement: null,
      elementArray: [],
      index: 0
    };

    // This is a "descriptor" object for the thumbnail images
    // that display at the bottom.
    var thumbDesc = {
      parentElement: document.querySelector('.thumbs-inner'),
      currentElement: null,
      elementArray: [],
      index: 0
    };

    // The following functions are nested inside the link function
    // so they can share its local variables.

    // Advances to the next image.
    function advance() {
      if (timerReset) {
        timerReset = false;
        return;
      }

      // Remove selection indicator from current thumbnail.
      thumbImgs[fullDesc.index].className = 'carousel-thumb';

      // Advance to the next image.
      fullDesc.index++;

      // Determine if we need to advance to the next batch.
      var newBatch = false;
      if (fullDesc.index === imageCount) {
        // This is the last image.
        fullDesc.index = thumbDesc.index = 0;
        newBatch = true;
      } else if (fullDesc.index % imagesPerBatch === 0) {
        // This is the first image in a new batch.
        thumbDesc.index++;
        newBatch = true;
      }

      showFull();

      if (newBatch) {
        showBatch();
      } else {
        // Add selection indicator to new thumbnail.
        thumbImgs[fullDesc.index].className += ' current-image';
      }
    }

    function main() {
      processImages();

      // Advances to the next batch of thumbnails.
      scope.nextBatch = function () {
        timerReset = true;
        thumbDesc.index++;
        if (thumbDesc.index * imagesPerBatch >= imageCount) {
          thumbDesc.index = 0; // first batch
        }
        showBatch();
      };

      // Retreats to the previous batch of thumbnails.
      scope.previousBatch = function () {
        timerReset = true;
        if (thumbDesc.index === 0) {
          thumbDesc.index =
            Math.floor(imageCount / imagesPerBatch); // last batch
        } else {
          thumbDesc.index--;
        }
        showBatch();
      };

      // Start at the first image and the first batch of thumbnails.
      fullDesc.index = thumbDesc.index = 0;
      thumbImgs[fullDesc.index].className += ' current-image';
      showFull();
      showBatch();

      // Automatically advance to the next image every this many seconds.
      var seconds = Number(scope.secondsPerImage) || 2;
      $interval(advance, seconds * 1000);
    }

    // Opens a given URL in a new browser window/tab.
    function openUrl(url) {
      window.open(url, '_blank');
    }

    // Creates all the div and img elements that are needed.
    function processImages() {
      var batchCount = Math.ceil(imageCount / imagesPerBatch);
      var div;

      // Create a div to hold each batch of thumbnails.
      for (var i = 0; i < batchCount; i++) {
        div = document.createElement('div');
        div.className = 'thumb-batch';
        thumbDesc.elementArray.push(div);
      }

      for (var index = 0; index < imageCount; index++) {
        var obj = scope.images[index]; // has properties full, thumb and url

        // Create the full-size image.
        var img = new Image();
        img.className = 'carousel-img';
        img.src = obj.full;
        if (obj.url) img.onclick = openUrl.bind(null, obj.url);
        fullDesc.elementArray[index] = img;

        // Create the thumbnail-size image.
        img = new Image();
        img.className = 'carousel-thumb';
        img.src = obj.thumb || obj.full;
        img.onclick = selectImage.bind(null, index);

        div = document.createElement('div');
        div.appendChild(img);
        var bIndex = Math.floor(index / imagesPerBatch);
        thumbDesc.elementArray[bIndex].appendChild(div);
        thumbImgs[index] = img;
      }
    }

    // Advance to an image in the current batch of thumbnails
    // specified by index.
    function selectImage(newIndex) {
      timerReset = true;

      // Remove selection indicator from current thumbnail.
      thumbImgs[fullDesc.index].className = 'carousel-thumb';

      fullDesc.index = newIndex;

      // Add selection indicator to new thumbnail.
      thumbImgs[fullDesc.index].className += ' current-image';

      showFull();
    }

    // Advance to the next full-size image or batch of thumbnails
    // based the "descriptor" object that is passed.
    function showNext(desc) {
      // When the transition ends ...
      function tranEnd() {
        nextElement.removeEventListener('transitionend', tranEnd, false);

        // Remove the element that slid off the screen.
        var el = desc.currentElement;
        var parent = el.parentElement;
        if (parent) parent.removeChild(el);

        // Make the next element be the current element.
        desc.currentElement = nextElement;
      }

      var nextElement = desc.elementArray[desc.index];
      var width;

      // If there was a previous element ...
      if (desc.currentElement) {
        nextElement.addEventListener('transitionend', tranEnd, false);

        // Place the element to the right of the current one.
        width = getComputedStyle(desc.currentElement).width;
        nextElement.style.left = width;
      } else {
        nextElement.style.left = '0px';
        desc.currentElement = nextElement;
      }

      desc.parentElement.appendChild(nextElement);

      if (desc.currentElement) {
        // In next turn of the event loop ...
        setTimeout(function () {
          // Slide the current and next elements to the left.
          desc.currentElement.style.left = '-' + width;
          nextElement.style.left = '0px';
        }, 15);
      }
    }

    // Shows the next batch of thumbnails.
    function showBatch() {
      showNext(thumbDesc);

      // The first image in the batch is the current one.
      thumbImgs[fullDesc.index].className += ' current-image';
    }

    // Shows the next full-size image.
    function showFull() {
      showNext(fullDesc);
    }

    main();
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
  module.directive('rmvCarousel', ['$interval', function ($interval) {
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
  }]);
})();
