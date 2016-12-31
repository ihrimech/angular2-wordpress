var gulp = require('gulp'),
    less = require('gulp-less'),
  cssmin = require('gulp-cssmin'),
  rename = require('gulp-rename');
var shell = require('gulp-shell');
var clean = require('gulp-clean');
var htmlreplace = require('gulp-html-replace');
var runSequence = require('run-sequence');
var Builder = require('systemjs-builder');
var builder = new Builder('', 'systemjs.config.js');

/**
 * Less compilation and minification
 */

gulp.task('watch', function () {
  gulp.watch('style/**/*.less', ['less']);
});

gulp.task('less', function () {

  return gulp.src('style/style.less')
  .pipe(less().on('error', function (err) {
    console.log(err);
  }))
  .pipe(cssmin().on('error', function(err) {
    console.log(err);
  }))
  .pipe(rename('styles.css'))
  .pipe(gulp.dest('./'));

});
gulp.task('clean:css', function () {
    return gulp.src(['*.css'], {read: false})
        .pipe(clean());
});

gulp.task('default', ['clean:css', 'less', 'watch']);


/**
 * production stuff goes here
 */
var bundleHash = new Date().getTime();
var mainBundleName = bundleHash + '.main.bundle.js';
var vendorBundleName = bundleHash + '.vendor.bundle.js';





// This is main task for production use
gulp.task('production', function(done) {
    runSequence('clean','less', 'compile_ts', 'bundle', 'copy_img', 'copy_style', 'copy_assets', function() {
        done();
    });
});

gulp.task('bundle', ['bundle:vendor', 'bundle:app'], function () {
    return gulp.src('index.html')
        .pipe(htmlreplace({
            'app': mainBundleName,
            'vendor': vendorBundleName
        }))
        .pipe(gulp.dest('./public_html'));
});

gulp.task('bundle:vendor', function () {
    return builder
        .buildStatic('dist/app/vendor.js', './public_html/' + vendorBundleName)
        .catch(function (err) {
            console.log('Vendor bundle error');
            console.log(err);
        });
});

gulp.task('bundle:app', function () {
    return builder
        .buildStatic('dist/app/main.js', './public_html/' + mainBundleName)
        .catch(function (err) {
            console.log('App bundle error');
            console.log(err);
        });
});

gulp.task('compile_ts', ['clean:ts'], shell.task([
    'tsc'
]));

gulp.task('copy_assets', function() {
     return gulp.src(['./app/**/*.html'], {base:"."})
        .pipe(gulp.dest('./public_html'));
});
gulp.task('copy_style', function() {
     return gulp.src(['./styles.css'], {base:"."})
        .pipe(gulp.dest('./public_html'));
});
gulp.task('copy_img', function() {
     return gulp.src(['./style/images/**/*'], {base:"."})
        .pipe(gulp.dest('./public_html'));
});

gulp.task('clean', ['clean:public_html']);

gulp.task('clean:public_html', function () {
    return gulp.src(['public_html'], {read: false})
        .pipe(clean());
});

gulp.task('clean:ts', function () {
    return gulp.src(['app/**/*.js', 'app/**/*.js.map'], {read: false})
        .pipe(clean());
});
