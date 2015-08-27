var gulp = require('gulp'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    requireDir = require('require-dir');

var sassDir = ['./src/*.scss', './src/**/*.scss', './src/**/**/*.scss'];

gulp.task('scripts', function(){
   gulp.src(['./web/bower/pi-angular/dist/pi-angular.js'])
      .pipe(concat('pi-angular.js'))
      .pipe(gulp.dest('./web/public/dist'));

    gulp.src(['./web/bower/angular/angular.js'])
      .pipe(concat('angular.js'))
      .pipe(gulp.dest('./web/public/dist'));
});
gulp.task('sass', function () {
    gulp.src(sassDir)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./release'));
});
gulp.task('default', ['sass', 'scripts']);
gulp.task('watch', function(){
    gulp.watch(sassDir, ['sass']);
});
