import gulp from 'gulp';
import run from 'gulp-run';

import gulpIf from 'gulp-if';
import fileinclude from 'gulp-file-include';

const flatten = (obj) => {
  let r = [];
  for(const key in obj) {
    r = [...r, ...obj[key]];
  }
  return r;
}

const watchSrc = {
  js: {
    components: [
      'src/js/components/**/*.js', 'src/js/components/**/*.mjs',
    ],
  },
  html: [
    'src/html/**/*.html', 'src/html/**/*.htm'
  ]
}

gulp.task('default', async () => {
  gulp.watch(
    watchSrc.js.components, 
    gulp.parallel([
      'components',
    ]),
  );

  gulp.watch(
    watchSrc.html, 
    gulp.parallel([
      'html'
    ]),
  );
});

gulp.task('components', async () => {
    run('npm run webpack:components')
      .exec()
      .on('error', function() {
        console.log('webpack :: components build error');
      });
});

gulp.task('html', async () => {
  gulp.src(watchSrc.html)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        
      }
    }))
    .pipe(gulp.dest('site'));
});
