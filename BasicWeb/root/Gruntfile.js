'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    sass: {
      dev: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,       
          cwd: 'dev/',        
          src: ['style/style.scss'],  
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
          "boss": true,     // true: Tolerate assignments where comparisons would be expected
          "curly": true,    // true: Require {} for every new block or scope
          "eqeqeq": true,   // true: Require triple equals (===) for comparison
          "eqnull": true,   // true: Tolerate use of `== null`
          "immed": true,    // true: Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
          "latedef": true,  // true: Require variables/functions to be defined before being used
          "newcap": true,   // true: Require capitalization of all constructor functions e.g. `new F()`
          "noarg": true,    // true: Prohibit use of `arguments.caller` and `arguments.callee`
          "sub": true,      // true: Tolerate using `[]` notation when it can still be expressed in dot notation
          "undef": true,    // true: Require all non-global variables to be declared (prevents global leaks)
          "unused": true,
          "node": true,     // Node.js
          "-W117": true     // true: Ignore `not defined` errors as an example of using a rule (W117) by code.
      },
      src: {
        src: ['release/**/*.js']
      },
    },
    copy: {
      main: {
       expand: true, 
          cwd: 'dev/',
          src: ['**','!**/*.scss','!**/*.css','!**/*.js'],
         dest: 'release/',
      },
    },
    watch: {
      sass: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      scripts:{
        files: 'dev/scripts/*.js',
        tasks: ['uglify']
      },
      otherFiles:{
        files: ['**','!**/*.scss','!**/*.css','!**/*.js'],
        tasks: ['copy']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass','uglify','jshint','copy', 'watch']);

};