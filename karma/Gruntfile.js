'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 3000
        }
      },
    },
    jshint: {
      all: ['Gruntfile.js', 'scripts/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: '/Users/Mark/.jshintrc'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    watch: {
      options: { livereload: true },
      js: {
        files: ['Gruntfile.js', 'scripts/**/*.js', 'test/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  var tasks = [
    'grunt-contrib-connect',
    'grunt-contrib-jshint',
    'grunt-contrib-watch',
    'grunt-karma'
  ];
  tasks.forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['connect:server', 'watch']);
  //grunt.registerTask('default', ['server', 'watch']);
  //grunt.registerTask('unit', ['karma:unit']);
  grunt.registerTask('server', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: ['server.js'],
      opts: {stdio: 'inherit'}
    });
  });
};
