const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

// Static server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Sass compiler
gulp.task('styles', function() {
    gulp.src('sass/**/**.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Autoprefixer
gulp.task('prefix', function() {
    gulp.src('dist/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 version'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Watch task
gulp.task('watch', ['browserSync', 'styles', 'prefix'], function() {
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['styles']);