/* jshint node: true */
"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var dest = 'docs';
var bowerDirectory = './bower_components';

var bowerDependancies = [
    'jquery/jquery.js',
    'underscore/underscore.js',
    'select2/select2.js',
    'angular/angular.js',
    'angular-animate/angular-animate.js',
    'angular-loading-bar/src/loading-bar.js',
    'angular-bootstrap/ui-bootstrap-tpls.min.js',
    'angular-ui-date/src/date.js',
    'restangular/dist/restangular.min.js',
    'moment/moment.js',
    'angular-moment/angular-moment.min.js',
    'angular-ui-select2/src/select2.js',
    'angular-ui-router/release/angular-ui-router.min.js',
    'jquery-ui/ui/jquery.ui.core.js',
    'jquery-ui/ui/jquery.ui.datepicker.js',
    'jquery-ui/ui/i18n/jquery.ui.datepicker-fr.js',
    'jquery-ui/ui/minified/jquery-ui.min.js',
    'checklist-model/checklist-model.js',
    'dropzone/downloads/dropzone.js',
    'ev-fdm/dist/ev-fdm.js'
].map(function (path) {
    return bowerDirectory + '/' + path;
});

// ///////////////////////////////////////////////////
// LESS
// //////////////////////////////////////////////////

var src = ['less/main.less'];
gulp.task('less', function() {
    return gulp.src(src)
    .pipe(less())
    .pipe(gulp.dest(dest + '/css'))
    .on('error', console.error.bind(console));
});

gulp.task('watch-less', function () {
    gulp.watch(src, ['less']);
});


// ///////////////////////////////////////////////////
// COPY
// //////////////////////////////////////////////////


gulp.task('copy', function() {
    gulp.src([bowerDirectory + '/ev-fdm/dist/fonts/**/*'])
        .pipe(gulp.dest(dest + '/fonts/'));
    gulp.src([bowerDirectory + '/ev-fdm/dist/images/**/*'])
        .pipe(gulp.dest(dest + '/images/'));
    gulp.src([bowerDirectory + '/ev-fdm/dist/css/**/*'])
        .pipe(gulp.dest(dest + '/css/'));
});
gulp.task('watch-copy', function () {
    gulp.watch( [bowerDirectory + '/ev-fdm/dist/**/*'], ['copy']);
});


// ///////////////////////////////////////////////////
// CONCAT
// //////////////////////////////////////////////////
gulp.task('concat', function () {
    return gulp.src(bowerDependancies)
        .pipe(concat('bower_dependancies.js'))
        .pipe(gulp.dest(dest + '/js'))
        .on('error', console.error.bind(console));
});

gulp.task('watch-concat', function () {
    gulp.watch( [bowerDirectory], ['concat']);
});

gulp.task('build', ['less', 'copy', 'concat']);
gulp.task('watch', ['watch-copy', 'watch-less', 'watch-concat']);
gulp.task('default', ['build', 'watch']);
