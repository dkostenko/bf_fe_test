var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var stylish    = require('jshint-stylish');

gulp.task('lint', ['lint:js']);

gulp.task('lint:js', function() {
  var SRC  = 'app/**/*.js';

  return gulp
    .src(SRC)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
});
