/* jshint node: true */
"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var exec = require('child_process').exec;
var tinylr = require('tiny-lr');

var dest = 'docs';
var bowerrc = '';
try {
    bowerrc = require('./.bowerrc.json');
} catch (e) {
    bowerrc = {};
}
var bowerDirectory =  (bowerrc.directory) ? bowerrc.directory : './bower_components';

// ///////////////////////////////////////////////////
// LESS
// //////////////////////////////////////////////////

function less(src, paths, dest) {
    return gulp.src(src)
        .pipe(less({
            paths: paths
        }))
        .pipe(gulp.dest(dest));
}


var src = ['less/**/*.less'];
var paths = ['less', bowerDirectory + '/ev-fdm/core/less' ];
gulp.task('less', function () {
    return less(src, paths, dest + '/css');
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
});
gulp.task('watch-copy', function () {
    gulp.watch(
        [bowerDirectory + '/ev-fdm/dist/fonts/**/*', bowerDirectory + '/ev-fdm/dist/images/**/*'],
        ['copy']
    );
});


gulp.task('jekyll build', function (done) {
    exec('jekyll build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done(err);
    });
});

gulp.task('watch-build', function () {
    gulp.watch(['docs/**/*', '!docs/bower_components/**/*', 'docs/bower_components/ev-fdm/**/*'], ['jekyll build']);
});


gulp.task('livereload', function() {
    var livereload = tinylr();
    livereload.listen(35730);
    console.log('Created livereload server on port '+ 35730);
    gulp.watch('_site/**', function (files) {
        livereload.changed({ params: { files: files }});
    });
});


gulp.task('build', ['less', 'copy', 'jekyll build']);
gulp.task('watch', ['watch-copy', 'watch-less', 'watch-build']);
gulp.task('default', ['livereload', 'build', 'watch']);

