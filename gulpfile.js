'use strict';

var gulp         = require( 'gulp' );
var connect      = require( 'gulp-connect' );
var sass         = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );


// Compile stylesheets
gulp.task( 'styles', function () {
    gulp.src( 'sass/styles.scss' )
    .pipe( sass( {
        includePaths: [ 'node_modules/bootstrap-sass/assets/stylesheets' ]
    })
    .on( 'error', sass.logError ))
    .pipe( autoprefixer() )
    .pipe( gulp.dest( 'css/' ))
    .pipe( connect.reload() );
});


gulp.task( 'serve', function() {
    connect.server({
        root: [__dirname],
        livereload: true
    });
});


// Watch for changes
gulp.task( 'watch', [ 'styles', 'serve' ], function () {
    gulp.watch( 'sass/**/*.scss', [ 'styles' ]);
});


gulp.task( 'default', [ 'styles' ] );