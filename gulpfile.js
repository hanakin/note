var gulp = require('gulp');
var elixir = require('laravel-elixir');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
// var path = require('path');
var jade = require('gulp-jade');

elixir.config.assetsPath = 'src/assets';
elixir.config.publicPath = 'dist/assets';
elixir.config.production = false;
elixir.config.sourcemaps = true;

var paths = {
    jade: {
        src: 'src/jade/*.jade',
        dest: 'dist',
    },
    stylesheets: {
        src: [
            'app.scss',
        ],
        dest: 'dist/assets/css',
    },
    scripts: {
        src: [
            'app.js',
        ],
        dest: 'dist/assets/js',
    },
};

gulp.task('jade', function() {
    'use strict';
    return gulp
        .src(paths.jade.src)
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest(paths.jade.dest));
});

gulp.task('svg', function() {
    'use strict';
    return gulp
        .src('src/assets/imgs/svg/noteicon/*.svg')
        .pipe(svgmin({
            plugins: [
                { sortAttrs: true },
                { transformsWithOnePath: true },
                { collapseGroups: true },
                { convertShapeToPath: true },
                { mergePaths: true },
            ],
            js2svg: { pretty: true },
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('src/assets/imgs/svg'));
});

elixir(function(mix) {
    'use strict';
    mix
        .sass(paths.stylesheets.src)
        .browserify(paths.scripts.src)
        .task('jade', paths.jade.src)
        .task('svg', 'src/assets/imgs/svg/*/*.svg');
});
