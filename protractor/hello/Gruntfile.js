'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    clean: ['build'],
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
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'spec/**/*.js']
    },
    protractor: {
      options: {
        configFile: 'protractor.conf.js',
        keepAlive: true,
        noColor: false
      },
      all: {
      }
    },
    watch: {
      options: { livereload: true },
      css: {
        files: ['styles/*.css'],
        tasks: ['csslint', 'protractor']
      },
      html: {
        files: ['*.html'],
        tasks: ['protractor']
      },
      js: {
        files: ['Gruntfile.js', 'spec/**/*.js'],
        tasks: ['jshint', 'protractor']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default',
    ['jshint', 'connect', 'watch']);
};
