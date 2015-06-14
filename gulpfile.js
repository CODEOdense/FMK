var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    exec = require('gulp-exec'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    gulpBowerFiles = require('main-bower-files'),
    gulpFilter = require('gulp-filter'),
    bower = require('gulp-bower'),
    shell = require('gulp-shell'),
    runSequence = require('run-sequence'),
    stripDebug = require('gulp-strip-debug');

var themeDir = '';
var scssDir = 'sass/';
var jsDir = themeDir + 'js/';
var cssDir = themeDir + 'stylesheets/';
var assetDir = themeDir + 'assets/img/';
var mainSassFiles = [scssDir + 'style.scss', scssDir + 'no-mq.scss'];

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

var filter = gulpFilter('**/**.js');

gulp.task('update', shell.task([
  'npm install',
  'bower install'
]));

gulp.task('js', function() {
  gulp.src(gulpBowerFiles({debugging:false, filter: '**/*.js'}))
    .pipe(filter).on('error', handleError)
    .pipe(concat('bower.js')).on('error', handleError)
    .pipe(uglify({mangle: false})).on('error', handleError)
    .pipe(filter.restore()).on('error', handleError)
    .pipe(gulp.dest(jsDir));

  gulp.src('jsSrc/*.js')
    .pipe(uglify())
    .pipe(stripDebug())
    .pipe(gulp.dest(jsDir));
});

gulp.task('jsdev', function() {
  gulp.src(gulpBowerFiles({debugging:true, filter: '**/*.js'}))
    .pipe(filter).on('error', handleError)
    .pipe(concat('bower.js')).on('error', handleError)
    .pipe(filter.restore()).on('error', handleError)
    .pipe(gulp.dest(jsDir));

  gulp.src('jsSrc/*.js')
    .pipe(gulp.dest(jsDir));
});

gulp.task('compass', function() {
  gulp.src(mainSassFiles)
    .pipe(sass()).on('error', handleError)
    .pipe(prefix({ cascade: true }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(cssDir));
});

gulp.task('imageoptim', function() {
  return gulp.src('img/**/*')
    .pipe(imagemin({
      svgoPlugins: [{removeUselessStrokeAndFill: false}]
    }))
    .pipe(gulp.dest(assetDir));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(scssDir + '**/**.scss', ['compass']);
  gulp.watch(['jsSrc/*.js', 'adminJs/**/*.js'], ['jsdev']);
  gulp.watch(jsDir + '**.css').on('change', livereload.changed);
});

gulp.task('default', function(callback) {
  runSequence('update',
    ['js', 'compass', 'imageoptim'],
    callback);
});