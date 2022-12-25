import express from 'express';
import path from 'path';
const __dirname = path.resolve();

const app = express();

app.use('/blog', express.static(__dirname))

app.listen(4000, () => {
  console.log('🚀 Run Dev Server!');
  console.log('http://localhost:4000');
})