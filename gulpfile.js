var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    exec = require('gulp-exec'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    gulpBowerFiles = require('main-bower-files'),
    gulpFilter = require('gulp-filter'),
    shell = require('gulp-shell'),
    runSequence = require('run-sequence'),
    stripDebug = require('gulp-strip-debug'),
    stripDebug = require('gulp-strip-debug'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    combiner = require('stream-combiner2');

var themeDir = 'public/';
var scssDir = 'sass/';
var jsDir = themeDir + 'js/';
var cssDir = themeDir + 'stylesheets/';
var assetDir = themeDir + 'assets/img/';
var mainSassFiles = 'sass/output/*.scss';
var componentsDir = 'components/';
var mainJsEntryFile = 'js/main.js';
var sassComponentFile = 'sass/_components.scss';

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

var filter = gulpFilter('**/**.js');

gulp.task('update', shell.task([
  'bower install --allow-root'
]));

gulp.task('restartserver', shell.task([
  'pm2 restart index'
]));

gulp.task('localinstall', shell.task('npm rebuild node-sass'));

gulp.task('js', function() {
  gulp.src(gulpBowerFiles({debugging:false, filter: '**/*.js'}))
    .pipe(filter).on('error', handleError)
    .pipe(concat('bower.js')).on('error', handleError)
    .pipe(uglify({mangle: false})).on('error', handleError)
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
  gulp.watch('index.js', ['restartserver']);
  gulp.watch(['jsSrc/*.js', 'adminJs/**/*.js'], ['jsdev']);
  gulp.watch(cssDir + '**.css').on('change', livereload.changed);
  gulp.watch([componentsDir + '**/*.scss'], ['rendercomponentsdev']);
  gulp.watch([componentsDir + '**/*.vue', mainJsEntryFile, 'vuex/*.js'], ['buildcomponentsdev']);
});

gulp.task('default', function(callback) {
  runSequence('update',
      ['js', 'rendercomponents', 'imageoptim'],
      callback);
});

gulp.task('rendercomponents',  function(callback) {
  runSequence('buildcomponents',
      ['compass'],
      callback);
});

gulp.task('rendercomponentsdev',  function(callback) {
  runSequence('buildcomponentsdev',
      ['compass'],
      callback);
});

gulp.task('buildcomponents', function() {
  var b = browserify({
    entries: mainJsEntryFile,
    transform: ['vueify'],
    debug: true
  });
  b.plugin('bundlify-scss', {
    output: sassComponentFile
  });

  var combined = combiner.obj([
    b.bundle(),
    source('main.js'),
    buffer(),
    sourcemaps.init({loadMaps: true}),
    uglify(),
    sourcemaps.write('./'),
    gulp.dest(jsDir)
  ]);
  combined.on('error', handleError);
  return combined;
});

gulp.task('buildcomponentsdev', function() {
  var b = browserify({
    entries: mainJsEntryFile,
    transform: ['vueify'],
    debug: true
  });
  b.plugin('bundlify-scss', {
    output: sassComponentFile
  });

  var combined = combiner.obj([
    b.bundle(),
    source('main.js'),
    buffer(),
    sourcemaps.init({loadMaps: true}),
    sourcemaps.write('./'),
    gulp.dest(jsDir)
  ]);
  combined.on('error', handleError);
  return combined;
});