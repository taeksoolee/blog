import fs from 'fs';

import cheerio from 'cheerio';
import path, { resolve } from 'path';

const __dirname = path.resolve();


function getModifiedDate(path) {
  const mDate = new Date(fs.statSync(path.replace('site', 'src/html')).mtime);
  return mDate;
  
}

function getDocument(path) {
  const html = fs.readFileSync(path);
  return cheerio.load(html.toString());
}

const rootPath = 'site';
const paths = [
  __dirname, rootPath,
];


function inspectPaths(list) {
  const r = [];
  for(const i in list) {
    if (/\.html$/g.test(list[i])) {
      const fileName = list[i];
      const realPath = path.resolve(...paths) + `/${fileName}`;
      const $ = getDocument(realPath);
      r.push({
        dir: paths.slice(2),
        file: {
          fileName,
          modifiedDate: getModifiedDate(realPath),
          title: $('#meta h1').text(),
          pageId: $('#meta #pageId').text(),
        }
      })
    } else {
      paths.push(list[i]);
      r.push(...inspectPaths(fs.readdirSync(path.resolve(...paths))));
      paths.pop();
    }
  }

  return r;
}

function generatePageSource() {
  const sites = fs.readdirSync(path.resolve(...paths));
  const r = inspectPaths(sites);

  fs.writeFileSync(path.resolve(__dirname, 'data', 'site-data.json'), JSON.stringify(r), 'utf-8'); 
}

generatePageSource();
