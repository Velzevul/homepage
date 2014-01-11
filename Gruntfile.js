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
          banner: '/* See original non-minified files on Github https://github.com/Velzevul/homepage */',
          report: 'gzip',
        },
        files: {
          'production/public/css/main.css' : ['app/css/main.css']
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,                       // Enable dynamic expansion
          cwd: 'app/images/',                 // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],        // Actual patterns to match
          dest: 'production/public/images'    // Destination path prefix
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('prod', ['cssmin', 'imagemin']);
  grunt.registerTask('default', ['compass', 'express', 'watch', 'open', 'express-keepalive']);
};