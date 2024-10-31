// express
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1>');
});

app.get('/post', (req, res) => {
  res.send('<h1>Post page</h1>');
});

app.get('/user', (req, res) => {
  res.send('<h1>User page</h1>');
});

// 위에서 응답이 걸리지 않으면...
app.use((req, res) => {
  res.status(404).send('<h1>404 NOT FOUND</h1>');
});

app.listen(3000, () => {
  console.log('server is running...')
})