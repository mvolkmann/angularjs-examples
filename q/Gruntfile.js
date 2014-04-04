'use strict';
/*jshint node: true */

module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 3000
          //base: '.'
          // The following line is not needed if "watch" is also used.
          //keepalive: true
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', '*.js'],
      /*options: {
        jshintrc: 'jshintrc'
      }*/
    },
    watch: {
      options: {livereload: true},
      html: {
        files: ['*.html'],
        tasks: []
      },
      js: {
        files: ['Gruntfile.js', '*.js'],
        tasks: ['jshint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
  grunt.registerTask('default', ['jshint', 'connect', 'watch']);
};
