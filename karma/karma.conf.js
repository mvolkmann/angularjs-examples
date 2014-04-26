// Karma configuration
// Generated on Sat Mar 08 2014 14:56:28 GMT-0600 (CST)
'use strict';

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'lib/angular.js',
      'lib/angular-mocks.js',
      'lib/angular-route.js',
      'partials/*.html', // for directives that use templateUrl
      'scripts/*.js',
      'test/unit/*-spec.js'
    ],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors:
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.html': 'html2js'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    //   config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable/disable watching file and executing tests
    // whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers:
    // https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
