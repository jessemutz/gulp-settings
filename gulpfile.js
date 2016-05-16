var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sassLint = require('gulp-sass-lint'),
    cache = require('gulp-cached'),
    imagemin = require('gulp-imagemin');

var sassFiles = [ 'sass/overrides/**/_*.scss' ];

// Define which browsers to add vendor prefixes for.
var options = {};
options.autoprefixer = {
  browsers: [
    '> 1%',
    'ie 9'
  ]
};

// Compile SASS
gulp.task('sass', function () {
 return gulp.src(sassFiles)
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer(options.autoprefixer))
  .pipe(gulp.dest('css/'));
});

// Optimize Images
gulp.task('imgOptim', function () {
  gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
});

// #################
// Check for errors.
// #################
gulp.task('lint:sass', function() {
  gulp.src(sassFiles)
    // Only check changed files
    .pipe(cache('sassLint'))
    .pipe(sassLint())
    .pipe(sassLint.format())
    // .pipe(sassLint.failOnError())
});

gulp.task('lint', ['lint:sass']);


// ##############################
// Watch for changes and rebuild.
// ##############################

// Watch Sass
gulp.task('watch:sass', function () {
  gulp.watch(sassFiles, ['sass']);
});

// Watch Lint
gulp.task('watch:lint', function() {
  gulp.watch(sassFiles, ['lint:sass']);
});

// Watch Both
gulp.task('watch', ['watch:sass', 'watch:lint']);

gulp.task('default', ['sass', 'imgOptim']);