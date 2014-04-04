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
    jshint: {
      options: {
        jshintrc: 'jshintrc'
      },
      all: ['Gruntfile.js', '*.js']
    },
    watch: {
      options: { livereload: true },
      html: {
        files: ['*.html'],
      },
      js: {
        files: ['Gruntfile.js', '*.js'],
        tasks: ['jshint']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['connect', 'watch']);
};
