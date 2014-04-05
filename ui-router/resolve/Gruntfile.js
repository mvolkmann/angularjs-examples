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
        src: ['styles/*.css']
      }
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
