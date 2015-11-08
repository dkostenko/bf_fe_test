var connect = require('gulp-connect');
var gulp    = require('gulp');
var inject  = require('gulp-inject');
var jade    = require('gulp-jade');
var plumber = require('gulp-plumber');
var series  = require('stream-series')
var watch   = require('gulp-watch');

var SRC  = 'app/index.jade';
var DEST = '.tmp';

var VENDOR_SOURCES = ['.tmp/vendor*.js'];
var APP_SOURCES    = ['.tmp/*.js', '.tmp/*.css', '!.tmp/vendor*.js'];

function devBuild() {
  return gulp
    .src(SRC)
    .pipe(plumber())
    .pipe(inject(
      series(
        gulp.src(VENDOR_SOURCES, {read: false}),
        gulp.src(APP_SOURCES, {read: false})
      ),
      {ignorePath: '/.tmp'}
    ))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(DEST))
    .pipe(connect.reload())
}

function prodBuild() {
  return gulp
    .src(SRC)
    .pipe(plumber())
    .pipe(inject(
      series(
        gulp.src(VENDOR_SOURCES, {read: false}),
        gulp.src(APP_SOURCES, {read: false})
      ),
      {ignorePath: '/.tmp'}
    ))
    .pipe(jade())
    .pipe(gulp.dest(DEST))
}

/**
 * @param {string} env - 'development' or 'production'
 */
module.exports = function(env) {
  gulp.task('build:layout', function() {
    if (env === 'production') {
      return prodBuild();
    }

    watch(SRC, function() {
      devBuild();
    });

    return devBuild();
  });
};
