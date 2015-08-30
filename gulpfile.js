var gulp       = require('gulp'),
    jsmin      = require('gulp-uglify')
    sourcemaps = require('gulp-sourcemaps'),
    gutil      = require('gulp-util'),
    rename     = require("gulp-rename"),
    connect    = require('gulp-connect');

gulp.task('build', function() {
    gulp.src('./src/mrouter.js')
        .pipe(jsmin({
                preserveComments: 'some'
            }).on('error', gutil.log))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(gulp.dest('./demo/js'))
});

gulp.task('server', function() {
    connect.server({
        root: './demo/',
        port: 8081
    });
});

gulp.watch(['./src/mrouter.js'], function() {
    gulp.start('build');
});

gulp.task('default', ['build', 'server']);