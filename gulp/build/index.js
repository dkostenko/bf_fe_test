var path = require('path');
var gulp = require('gulp');
var runSequence = require('run-sequence');

/**
 * @param {string} env - 'development' or 'production'
 */
module.exports = function(env) {
  require(path.resolve(__dirname, 'layout'))(env);
  require(path.resolve(__dirname, 'scripts'))(env);
  require(path.resolve(__dirname, 'styles'))(env);
  require(path.resolve(__dirname, 'views'))(env);

  gulp.task('build', ['del'], function(cb) {
    runSequence(
      ['build:views', 'build:styles', 'build:scripts'],
      'build:layout',
      cb
    );
  });
}
