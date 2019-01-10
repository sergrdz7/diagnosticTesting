var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');



// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    }
  })
})
//Copy JSBootstrap files
// Move the javascript files into our /src/js folder
// gulp.task('js', function() {
//     // return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
//       return gulp.src(['node_modules/bootstrap/dist/js/*.js'])
//         .pipe(gulp.dest("src/js"))
//         .pipe(browserSync.stream());
// });

gulp.task('htmlFiles', function() {
  return gulp.src('src/*.html')
    // .pipe(gulp.dest('build'))
    .pipe(gulp.dest('dist'))
})

// gulp.task('jsFiles', function() {
//   return gulp.src('src/*.js')
//     .pipe(gulp.dest('dist/js/'))
// })

gulp.task('jsScripts', function() {
  return gulp.src('src/js/*.js')

  .pipe(gulp.dest('dist/js'))
})

gulp.task('iconFiles', function() {
  return gulp.src('src/assets/icons/*')
    .pipe(imagemin(
      [
        imagemin.jpegtran(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminPngquant(),
        imageminJpegRecompress()
      ]
    ))
    // .pipe(gulp.dest('build/assets/icons'))
    .pipe(gulp.dest('dist/assets/icons'))
})

gulp.task('images', function() {
  return gulp.src('src/assets/images/*')
    .pipe(imagemin(
      [
        imagemin.jpegtran(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminPngquant(),
        imageminJpegRecompress()
      ]
    ))
    // .pipe(gulp.dest('build/assets/images'))
    .pipe(gulp.dest('dist/assets/images'))
})



gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(autoprefixer({
        browsers: ['last 99 versions'],
        cascase: false
    }))
    // .pipe(uglify())
    .pipe(gulp.dest('dist/css')) // Outputs it in the css folder CHANGE TO BUILD WHEN READY
    // .pipe(gulp.dest('dist/css')) // Outputs it in the distribution css folder CHANGE TO BUILD WHEN READY
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', ['browserSync', 'sass', 'htmlFiles', 'images', 'iconFiles'], function() {
  // gulp.watch('src/assets/icons/*.png', ['iconFiles']);
  gulp.watch('src/*.html', ['htmlFiles']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
})

//BUILD
gulp.task('build',['sass', 'htmlFiles', 'jsScripts', 'images', 'iconFiles']);
