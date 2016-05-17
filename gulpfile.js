var autoprefixer = require('gulp-autoprefixer'),
    cache = require('gulp-cached'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    sourcemaps = require('gulp-sourcemaps');

var sassFiles = [ 'sass/**/*.scss' ];

// Define which browsers to add vendor prefixes for.
var options = {};
options.autoprefixer = {
  browsers: [
    'last 2 versions',
    '> 1%',
    'ie 8'
  ]
};

// ##########################
// Compile and opimize files.
// ##########################

// Compile SASS
// ------------
gulp.task('sass', function () {
 return gulp.src(sassFiles)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer(options.autoprefixer))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('css/'))
  .pipe(livereload());
});

// Optimize Images
// ---------------
gulp.task('imgOptim', function () {
  gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('images'))
});

// Check for errors and best practices.
// ------------------------------------
gulp.task('lint', function() {
  gulp.src(sassFiles)
    // Only check changed files
    .pipe(cache('sassLint'))
    .pipe(sassLint())
    .pipe(sassLint.format())
    // .pipe(sassLint.failOnError())
});

// ##############################
// Watch for changes and rebuild.
// ##############################

// Watch Sass
gulp.task('watch:sass', function () {
  livereload.listen();
  gulp.watch(sassFiles, ['sass']);
});

// Watch Lint
gulp.task('watch:lint', function() {
  gulp.watch(sassFiles, ['lint']);
});

// Watch Both
gulp.task('watch', ['watch:sass', 'watch:lint',]);

gulp.task('default', ['sass', 'imgOptim']);