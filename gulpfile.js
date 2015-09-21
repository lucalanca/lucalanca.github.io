/* jshint node:true */
'use strict';
// generated on 2015-01-18 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var minifyCSS = require('gulp-minify-css');
var ghPages = require('gulp-gh-pages');
var critical = require('critical');


console.log(JSON.stringify($));

gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))
    .pipe($.autoprefixer({browsers: ['> 1%']}))
    .pipe($.uncss({ html: ['.tmp/index.html'] }))
    .pipe(minifyCSS({}))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('html', ['views','styles'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src(['app/*.html', '.tmp/*.html'])
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    '!app/*.jade',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('connect', ['views', 'styles'], function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('.tmp'))
    .use(serveStatic('app'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('serve', ['connect', 'watch'], function () {
  require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/layouts/*.jade')
    .pipe(wiredep())
    .pipe(gulp.dest('app'));
});

gulp.task('views', function () {
  return gulp.src('app/*.jade')
    .pipe($.jade({pretty: true}))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('watch', ['connect'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'app/*.html',
    '.tmp/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*'
  ]).on('change', $.livereload.changed);

  gulp.watch('app/**/*.jade', ['views']);
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('bower.json', ['wiredep']);
});


gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras', 'critical'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({branch: 'master'}));
});


// Generate & Inline Critical-path CSS
gulp.task('critical', function (cb) {

    // At this point, we have our
    // production styles in main/styles.css

    // As we're going to overwrite this with
    // our critical-path CSS let's create a copy
    // of our site-wide styles so we can async
    // load them in later. We do this with
    // 'copystyles' above

    critical.generate({
        base: 'dist/',
        src: 'index.html',
        dest: 'styles/mail.css',
        width: 320,
        height: 480,
        minify: true
    }, function(err, output){
        critical.inline({
            base: 'dist/',
            src: 'index.html',
            dest: 'index.html',
            minify: true
        });
    });
});
