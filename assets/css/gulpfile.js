var gulp    = require('gulp');
var bem     = require('gulp-bem');
var concat  = require('gulp-concat');
 
var levels = ['base', 'blocks'];
var tree = bem(levels);
 
tree.deps('blocks/page')
    .pipe(bem.src('{bem}.css'))
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./dist'));