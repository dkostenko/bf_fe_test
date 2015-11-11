var path = require('path');
var gulp = require('gulp');
var runSequence = require('run-sequence');

var ROOT_PATH = path.resolve(__dirname);
var GULP_PATH = path.resolve(ROOT_PATH, 'gulp');

var ENV = process.env.NODE_ENV || 'development';
var HOST = process.env.HOST || '127.0.0.1';
var PROXY_URL = process.env.PROXY_URL || 'http://127.0.0.1:3000/';
var SUBDOMAIN = process.env.SUBDOMAIN || 'develop-v2';

require(path.resolve(GULP_PATH, 'build'))(ENV);
require(path.resolve(GULP_PATH, 'del'));
require(path.resolve(GULP_PATH, 'serve'))(HOST, PROXY_URL);

gulp.task('default', function(cb) {
  runSequence(
    'build',
    'serve',
    cb
  );
});
