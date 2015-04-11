var Dgeni = require('dgeni');

module.exports = function(grunt) {
    var base = 'src';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {

            },
            web: {
                    dest: 'dist/pi-angular.js',
                    src: [
                        base + '/module.js',
                        base + '/*.js',
			            base + '/**/module.js',
                        base + '/**/*.js'
                        ]
            },
            dependencies: {
                dest: 'dist/dependencies.js',
                src: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/angular-cookies/angular-cookies.js',
                    'bower_components/angular-facebook/lib/angular-facebook.js',
                    'bower_components/angular-mocks/angular-mocks.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/underscore/underscore.js',
                    'bower_components/ui-utils/ui-utils.js'
                ]
            }
        },
        phpunit: {
                classes: {
                        dir: 'src/tests/'
                },
                options: {
                        bin: '/usr/bin/phpunit',
                        colors: true,
                        bootstrap: 'src/tests/Bootstrap.php'
                }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('karma');
    grunt.registerTask('default', ['concat']);

    grunt.registerTask('dgeni', 'Generate docs via dgeni.', function() {
      var done = this.async();
      var dgeni = new Dgeni([require('./docs/dgeni-pi')]);
      dgeni.generate().then(done);
    });

};
