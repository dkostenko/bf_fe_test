var del = require('del');
var gulp = require('gulp');

gulp.task('del', function(cb) {
  del(['.tmp', 'dist.zip'], cb);
});
