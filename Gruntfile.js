module.exports = function(grunt) {
  grunt.initConfig({
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    express: {
      server: {
        options: {
          bases: ["app", "bower_components"],
          livereload: true
        }
      }
    },

    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    },

    watch: {
      css: {
        files: ['app/sass/**/*.scss'],
        tasks: ['compass']
      },

      livereload: {
        files: ['app/*.html', 'app/css/*.css', 'app/javascripts/**/*.js'],
        options: {
          livereload: true
        }
      }
    },

    cssmin: {
      dist: {
        options: {
          banner: '/* See not minified files on Github */',
          report: 'gzip',
        },
        files: {
          'app/css/main.min.css' : ['app/css/main.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['compass', 'express', 'watch', 'open', 'express-keepalive']);
};