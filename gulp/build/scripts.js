var connect = require('gulp-connect');
var browserify = require('browserify');
var gulp       = require('gulp');
var gutil      = require('gulp-util');
var jshint     = require('gulp-jshint');
var lodash     = require('lodash');
var ngAnnotate = require('gulp-ng-annotate');
var rev        = require('gulp-rev');
var source     = require('vinyl-source-stream');
var streamify  = require('gulp-streamify');
var stylish    = require('jshint-stylish');
var uglify     = require('gulp-uglify');
var watchify   = require('watchify');

/**
 * Get watchify + browserify incremental bundler
 *
 * @param {string} env - 'development' or 'production'
 * @param {string|array} entries - path to base js file/files
 */
function createBundler(env, entries) {
  var bundler;
  var options = lodash.assign({}, watchify.args, {
    entries: entries,
    debug: true,
  });

  if (env === 'production') {
    bundler = browserify(options);
  } else {
    bundler = watchify(browserify(options));
  }

  bundler.on('log', gutil.log);
  return bundler;
}

function devBundle(bundler, destDir, destFile) {
  return bundler
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(destFile))
    .pipe(gulp.dest(destDir))
}

function prodBundle(bundler, destDir, destFile) {
  return bundler
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(destFile))
    .pipe(ngAnnotate())
    .pipe(streamify(uglify()))
    .pipe(streamify(rev()))
    .pipe(gulp.dest(destDir))
}

/**
 * @param {string} env - 'development' or 'production'
 */
module.exports = function(env) {
  gulp.task('build:scripts', ['build:scripts:app', 'build:scripts:vendor'])

  gulp.task('build:scripts:app', function() {
    var SRC  = 'app/index.js';
    var DEST = '.tmp';
    var DEST_FILENAME = 'index.js';

    var bundler = createBundler(env, SRC)

    if (env === 'production') {
      return prodBundle(bundler, DEST, DEST_FILENAME);
    }

    bundler.on('update', function() {
      devBundle(bundler, DEST, DEST_FILENAME).pipe(connect.reload());
    });

    return devBundle(bundler, DEST, DEST_FILENAME).pipe(connect.reload());
  });

  gulp.task('build:scripts:vendor', function() {
    var SRC  = 'app/vendor.js';
    var DEST = '.tmp';
    var DEST_FILENAME = 'vendor.js';

    var bundler = createBundler(env, SRC)

    if (env === 'production') {
      return prodBundle(bundler, DEST, DEST_FILENAME);
    }

    bundler.on('update', function() {
      devBundle(bundler, DEST, DEST_FILENAME).pipe(connect.reload());
    });

    return devBundle(bundler, DEST, DEST_FILENAME).pipe(connect.reload());
  });

}
