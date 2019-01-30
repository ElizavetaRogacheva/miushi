var {src, dest, series, parallel, watch} = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync'),
postcss = require('gulp-postcss');
autoprefixer = require('autoprefixer');
cssnano = require('cssnano');
uglify = require('gulp-uglify');
imagemin = require('gulp-imagemin');

var reload = browserSync.reload;

var plugins = [
  autoprefixer({browsers: ['last 2 version']}),
  cssnano()
];


function styles() {
  return src('./app/css/main.scss')
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(dest('./dist/css'))
}

function scripts() {
  return src('app/js/**/*.js')
    .pipe(uglify())
    .pipe(dest('./dist/js'))
}

function images() {
  return src('app/img/*.*')
    .pipe(imagemin()) 
    .pipe(dest('./dist/img'));
}

function copyHtml() {
  return src('app/*.html')
    .pipe(dest('./dist'))
}

function watcher() {
  watch('app/css/**/*.scss', styles);
  watch('app/*.html', copyHtml);
  watch('app/js/**/*.js', scripts);
  watch('app/img/*.*', imagemin);

}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  browserSync.watch('./dist/**/*.*', browserSync.reload);
}


exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.copyHtml = copyHtml;
exports.serve = serve;

exports.default = series(parallel(styles, scripts, images, copyHtml), parallel(watcher, serve));





