const express = require('express');
const path = require('path');

const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;

const STATIC = path.resolve(__dirname, 'dist');
const INDEX = path.resolve(STATIC, 'index.html');

const app = express();

app.use(express.static(STATIC));

app.get('*', (req, res) => {
  res.sendFile(INDEX);
});

app.listen(port, () => {
  console.log(`Client side rendering app listening on port ${port}`);
});
