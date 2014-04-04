'use strict';

var processIncludes = require('./tasks/processIncludes');

var jsFiles = ['Gruntfile.js', 'content/scripts/**/*.js'];

module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'content'
        }
      }
    },
    jshint: { // validates JavaScript files
      all: jsFiles,
      options: {
        jshintrc: 'jshintrc'
      }
    },
    watch: {
      html: {
        files: ['content/*.html', 'content/partials/**/*.html'],
        tasks: []
      },
      js: {
        files: jsFiles,
        tasks: ['jshint'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['connect', 'watch']);
};
