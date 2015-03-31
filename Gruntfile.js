module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
			  options: {
			    style: 'expanded',
			    lineNumbers: true
			  },
			  files: {
			    'release/pi.css': 'src/boot.scss'
			  }
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['sass']);
};