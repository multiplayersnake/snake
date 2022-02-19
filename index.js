const { app } = require('./dist/server.js');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server side rendering app is started on localhost:', port);
});
