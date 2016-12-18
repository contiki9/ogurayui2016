var gulp = require('gulp');

//scss
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var plumber = require('gulp-plumber');

//browserSync
var browserSync = require('browser-sync');

//other
var runSequence = require('run-sequence');

// sass
gulp.task('sass', function () {
    console.log('--------- sass task ----------');
    gulp.src('./doc/assets/sass/**/*.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(pleeease({
            //sass: true
            //autoprefixer: true
            //minifier: true
            //mqpacker: true
        }))
        .pipe(gulp.dest('./doc/css/'));
    console.log('--------- bs-reload task ----------');
    browserSync.reload();
});

// browserSync
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './doc/',
            index: 'index.html'
        }
    });
});

gulp.task('bs-reload', function () {
    console.log('--------- bs-reload task ----------');
    browserSync.reload();
});



// gulpのデフォルト
gulp.task('default', ['browser-sync'], function () {
    gulp.watch('./doc/assets/sass/**/*.scss', ['sass']);
    gulp.watch('./doc/**/*.html', ['bs-reload']);
});




