var gulp = require('gulp'),
    concat = require('gulp-concat'),;

gulp.task('scripts', function(){

    gulp.src(appModules)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./web/public/dist'));

    gulp.src(['./web/bower/volupio-angular/dist/volupio.js'])
        .pipe(concat('volupio.js'))
        .pipe(gulp.dest('./web/public/dist'));

    gulp.src(['./web/bower/volupio-angular/dist/volupio-biddy-angular.js'])
        .pipe(concat('volupio-biddy-angular.js'))
        .pipe(gulp.dest('./web/public/dist'));

    gulp.src(['./web/bower/pi-angular/dist/pi-angular.js'])
      .pipe(concat('pi-angular.js'))
      .pipe(gulp.dest('./web/public/dist'));

    gulp.src(['./web/bower/angular/angular.js'])
      .pipe(concat('angular.js'))
      .pipe(gulp.dest('./web/public/dist'));
});

gulp.task('default', ['demo', 'dist']);
