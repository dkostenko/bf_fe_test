var connect = require('gulp-connect');
var gulp = require('gulp');
var sass = require('gulp-sass')
var rev  = require('gulp-rev');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');
var sourcemaps   = require('gulp-sourcemaps');
var watch        = require('gulp-watch');

var SRC  = 'app/index.scss';
var DEST = '.tmp';

function devBuild() {
  return gulp
    .src(SRC)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 1 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST))
    .pipe(connect.reload())
}

function prodBuild() {
  return gulp
    .src(SRC)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer('last 1 version'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(rev())
    .pipe(gulp.dest(DEST))
}

/**
 * @param {string} env - 'development' or 'production'
 */
module.exports = function(env) {
  gulp.task('build:styles', function() {
    if (env === 'production') {
      return prodBuild();
    }

    watch(['app/**/*.scss', 'app/**/*.css'], function() {
      devBuild();
    });

    return devBuild();
  });
}
