'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    cssmin: {
      target: {
        files: [{
          expand: true,       
          cwd: 'dev/',        
          src: ['**/*.css'],  
          dest: 'release/',       
          ext: '.min.css',    
          extDot: 'first'     
        }]
      }
    },
    uglify: {
      dist: {
        expand: true, 
        cwd: 'dev/',
        src: '**/*.js',
        ext: '.min.js',
        dest: 'release/'
      },
    },
    jshint: {
      options: {
        jshintrc: true
      },
      src: {
        src: ['release/**/*.js']
      },
    },
    copy: {
      main: {
       expand: true, 
          cwd: 'dev/',
          src: ['**','!**/*.css','!**/*.js'],
         dest: 'release/',
      },
    },
    watch: {
      style: {
        files: 'dev/style/*.css',
        tasks: ['cssmin']
      },
      scripts:{
        files: 'dev/scripts/*.js',
        tasks: ['uglify']
      },
      otherFiles:{
        files: ['**','!**/*.css','!**/*.js'],
        tasks: ['copy']
      }
    },
  });


  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['cssmin','uglify','jshint','copy', 'watch']);

};