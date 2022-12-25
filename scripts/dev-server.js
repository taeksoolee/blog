import express from 'express';
import path from 'path';
const __dirname = path.resolve();

const app = express();

const ROOT_PATH = '/blog';

app.use(ROOT_PATH, express.static(__dirname))

app.listen(4000, () => {
  console.log('🚀 Run Dev Server!');
  console.log(`index path is http://localhost:4000${ROOT_PATH}`);
})