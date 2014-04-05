'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },
    csslint: {
      strict: {
        options: {
          ids: false // allows ids to be used in CSS selectors
        },
        src: ['styles/*.css', 'build/styles/*.css']
      }
    },
    htmllint: { // doesn't check indentation
      all: ['index.html']
    },
    jshint: {
      options: {
        jshintrc: 'jshintrc'
      },
      all: ['Gruntfile.js', 'scripts/**/*.js']
    },
    watch: {
      options: { livereload: true },
      css: {
        files: ['styles/*.css'],
        tasks: ['csslint']
      },
      html: {
        files: ['*.html', 'partials/*.html'],
        //tasks: ['htmllint']
      },
      js: {
        files: ['Gruntfile.js', 'scripts/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['connect', 'watch']);
};
