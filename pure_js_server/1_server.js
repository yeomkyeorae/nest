// 기본 nodejs 서버
const http = require('http');
const url = require('url');

// localhost -> 127.0.0.1 = loop back = 서버를 실행한 컴퓨터
const host = 'localhost';
const port = 3000;

// req -> request -> 요청
// res -> response -> 응답
const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;

  if (path === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('<h1>Home page</h1>');
  } else if (path === '/post') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('<h1>Post page</h1>');
  } else if (path === '/user') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('<h1>User page</h1>');
  } else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end('<h1>404 NOT FOUND</h1>');
  }
});

server.listen(port, host, () => {
  console.log(`server is running on ${host}:${port}...`)
});