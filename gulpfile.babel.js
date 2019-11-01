'use strict';

// modules
const gulp     = require('gulp');
const ts       = require('gulp-typescript');
const babel    = require('gulp-babel');
const pug      = require('gulp-pug');
const tsDir    = './ts/';
const jsDir    = './js/';


gulp.task('ts', function() {
    return gulp.src(tsDir + '**/*.ts')
        .pipe(ts({
            noImplicitAny: true
        }))
        .pipe(babel())
        .pipe(gulp.dest(jsDir))
});

gulp.task('views', function buildHTML() {
    return gulp.src('./views/*.pug')
    .pipe(pug({
      // Your options in here.
    }))
    .pipe(gulp.dest('./'))
  });