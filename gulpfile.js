import { defaultTitle } from './config.js';
// import tailwindConfig from './tailwind.config.js';

import gulp from 'gulp';
import run from 'gulp-run';

import debug from 'gulp-debug';

import gulpIf from 'gulp-if';
import fileinclude from 'gulp-file-include';

const flatten = (obj) => {
  let r = [];
  for(const key in obj) {
    if(Array.isArray(obj[key])) {
      r = [...r, ...obj[key]];
    } else {
      r = [...r, ...flatten(obj[key])];
    }
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
};

console.log(flatten(watchSrc));

gulp.task('default', async (fn) => {
  const watcher = gulp.watch(
    flatten(watchSrc)
  );

  watcher.on('change', function(path, _stats) {
    if(path.includes('src/js/components')) {
      componentsTask()
    }

    if(path.includes('src/html')) {
      htmlTask();
    }
  })
});

gulp.task('components', componentsTask);
async function componentsTask() {
  gulp.src(watchSrc.js.components)
    .pipe(debug({title: 'components:'}))
    .pipe(
      run('npm run webpack:components')
        .exec()
        .on('error', function() {
          console.log('webpack :: components build error');
        })
    );
};

gulp.task('html', htmlTask);
async function htmlTask() {
  gulp.src(watchSrc.html[0])
    .pipe(debug({title: 'html:'}))
    .pipe(gulpIf('*.html', fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        nullString: '',
        titleConcatString: '|',
        defaultTitle,
        // tailwindConfig: JSON.stringify(tailwindConfig),
      }
    })))
    .pipe(
      run('npm run generate:meta')
        .exec()
        .on('error', function() {
          console.log('generate meta error');
        })
    )
    .pipe(gulp.dest('site'));
}