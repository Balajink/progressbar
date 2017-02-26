var gulp = require('gulp');
var less = require('gulp-less');
var del = require('del');
var uglify = require('gulp-uglify');
var open = require('gulp-open');

gulp.task('styles', ['clean-styles'], function() { 
    
    return gulp
            .src('./src/styles/styles.less')
            .pipe(less())
            .pipe(gulp.dest('./release'));
});

gulp.task('clean-styles', function() {  
    var files = './release' + '**/*.css';
    clean(files);
});


function clean(path){
    del(path);
}

gulp.task('minify-code', function() {

    return gulp
        .src('./src/scripts/progress.js')
        .pipe(uglify())
        .pipe(gulp.dest('./release'));
});

gulp.task('clean-code', function() {  
    var files = './release' + '**/*.*';
    clean(files);
});


gulp.task('production', ['clean-code', 'styles', 'minify-code'], function(){
		return gulp.src(['./src/*.html'])
                .pipe(gulp.dest('./release'));
});


gulp.task('release',['production'], function(){
		gulp.src('./release/index.html')
  			.pipe(open());
});