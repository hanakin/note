var     gulp = require('gulp'),
	  elixir = require('laravel-elixir'),
	  svgmin = require('gulp-svgmin'),
	svgstore = require('gulp-svgstore'),
		path = require('path'),
		jade = require('gulp-jade');

elixir.config.assetsPath = 'src/assets';
elixir.config.publicPath = 'dist/assets';
elixir.config.production = false;
elixir.config.sourcemaps = true;

var paths = {
	jade: {
		src: 'src/jade/*.jade',
		dest: 'dist'
	},
	stylesheets: {
		src: [
			'app.scss'
		],
		dest: 'dist/assets/css'
	},
	scripts: {
		src: [
			'app.js'
		],
		dest: 'dist/assets/js'
	},
}

gulp.task('jade', function() {
	return gulp
		.src(paths.jade.src)
		.pipe(jade({ pretty: true }))
		.pipe(gulp.dest(paths.jade.dest));
});

gulp.task('svg', function() {
	return gulp
		.src('src/assets/imgs/svg/noteicon/*.svg')
		.pipe(svgmin({
			plugins: [
				{ sortAttrs: true },
				{ transformsWithOnePath: true },
				{ collapseGroups: true },
				{ convertShapeToPath: true },
				{ mergePaths: true }
			],
			js2svg: { pretty: true }
		}))
		.pipe(svgstore())
		.pipe(gulp.dest('src/assets/imgs/svg'));
});

elixir(function(mix) {
	mix
		.sass(paths.stylesheets.src)
		.browserify(paths.scripts.src)
		.task('jade', paths.jade.src)
		.task('svg', 'src/assets/imgs/svg/*/*.svg');
});

