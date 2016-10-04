var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./public/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/build/css'));
});
gulp.task('watch', function () {
  gulp.watch('./public/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass','watch']);
