const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") return respondHello(req, res);
  if (req.url === "/user-agent") return respondU(req, res);
  if (req.url.match(/^\/b64\//)) return respondB(req, res);

  res.end();
});

function respondHello(req, res) {
  res.end(JSON.stringify({ msg: "hello" }));
}

function respondU(req, res) {
  const ua = req.headers["user-agent"];
  res.end(JSON.stringify({ ua }));
}

function respondB(req, res) {
  res.end(JSON.stringify({b64: Buffer.from(req.url.replace(/^\/b64\//, "")).toString("base64")}));
}

server.listen(PORT);
console.log(`Server listening on port ${PORT}`);

if (require.main !== module) module.exports = server;
