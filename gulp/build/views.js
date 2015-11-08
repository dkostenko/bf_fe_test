var cache = require('gulp-cached');
var connect = require('gulp-connect');
var gulp = require('gulp');
var jade = require('gulp-jade');
var rev  = require('gulp-rev');
var streamify = require('gulp-streamify');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var watch  = require('gulp-watch');

var SRC  = ['app/**/*.jade', '!app/index.jade'];
var DEST = '.tmp';

function devBuild() {
  return gulp
    .src(SRC)
    .pipe(cache('views'))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(DEST))
    .pipe(connect.reload())
}

function prodBuild() {
  return gulp
    .src(SRC)
    .pipe(jade())
    .pipe(templateCache({module: 'app', root: '/'}))
    .pipe(streamify(uglify()))
    .pipe(rev())
    .pipe(gulp.dest(DEST))
}

/**
 * @param {string} env - 'development' or 'production'
 */
module.exports = function(env) {
  gulp.task('build:views', function() {
    if (env === 'production') {
      return prodBuild();
    }

    watch(SRC, function() {
      devBuild();
    });

    return devBuild();
  });
};
