const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');
const walk = require('walkdir');
const chokidar = require('chokidar');

const childProcess = require('child_process');

const commander = require('commander');
const program = commander.program;

program
  .option('--dev');
program.parse();

const { dev } = program.opts();

const SRC = 'src';
const STATIC = 'static';
const PAGES = `pages`;
const STATIC_PAGES = `${STATIC}/${PAGES}`;
const DOCS = 'docs';

const srcPath = path.resolve(__dirname, SRC);
const pagesPath = path.resolve(__dirname, STATIC_PAGES);
const docsPath = path.resolve(__dirname, DOCS);
const ext = '.html';

const renderTemplate = () => {
  console.log('🔥 render start ::: ');

  nunjucks.configure(STATIC, { autoescape: true });

  const paths = walk(pagesPath, {
    sync: true,
    return_object: true,
  });

  const getParentDir = (path) => path.replace(/\/[^\/]*$/, '');

  Object.keys(paths).forEach((path) => {
    const stat = paths[path];

    if (stat.isFile() && path.endsWith(ext)) {
      const targetPath = path.replace(STATIC_PAGES, DOCS);
      const targetDir = getParentDir(targetPath);

      const mkdir = (dir) => {
        if (!fs.existsSync(dir)) {
          try {
            fs.mkdirSync(dir);
          } catch(err) {
            mkdir(getParentDir(dir));
            fs.mkdirSync(dir);
          }
        }
      }
      mkdir(targetDir);
  
      const absPath = path.replace(pagesPath, '');
      const html = nunjucks.render(PAGES + absPath);
      fs.writeFileSync(targetPath, html);
      console.log(`📝 render ::: ${targetPath}`)
    }
  });
}

const buildJS = () => {
  childProcess.exec('npm run webpack', (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log('📝 complete js build');
  });
}

renderTemplate();
buildJS();

if (dev) {
  chokidar.watch(pagesPath, {
    persistent: true,
    ignoreInitial: true,
  })
    .on('add', () => {
      renderTemplate();
    })
    .on('change', () => {
      renderTemplate();
    })
    .on('unlink', () => {
      renderTemplate();
    })
    .on('error', (err) => {
      console.log(err);
    });

  chokidar.watch(srcPath, {
    persistent: true,
    ignoreInitial: true,
  })
    .on('add', () => {
      buildJS();
    })
    .on('change', () => {
      buildJS();
    })
    .on('unlink', () => {
      buildJS();
    })
    .on('error', (err) => {
      console.log(err);
    });

  // const express = require('express');
  // const livereload = require('livereload');
  // const livereloadMiddleware = require('connect-livereload');

  // const liveServer = livereload.createServer({
  //   exts: ['html', 'css', 'js'],
  //   debug: true,
  // });

  // liveServer.watch(docsPath);

  // const app = express();

  // app.use(express.static(DOCS));
  // app.use(livereloadMiddleware({
  //   port: 4000,
  // }));

  // app.listen(4000);
}
