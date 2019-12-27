const http = require("http");
const _ = require('lodash')

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") return respondHello(req, res);
  if (req.url === "/user-agent") return respondU(req, res);
  if (req.url.match(/^\/b64\//)) return respondB(req, res);
  if (req.url === '/repetitive-word') return respondRepetitiveWord(req, res)

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

function respondRepetitiveWord (req, res) {
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const words = countWords(JSON.parse(body).text)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(words))
  })
}

server.listen(PORT);
console.log(`Server listening on port ${PORT}`);

if (require.main !== module) module.exports = server;

function countWords (text) {
  const parsedText = {}
  const words = text.replace(/[,.!?:;"'()<>]/g, '').split(' ')
  const repetitiveWords = []
  words.forEach(word => {
    if (word.length < 3 ||
        word === 'the') return
    parsedText.hasOwnProperty(word)
      ? parsedText[word]++
      : parsedText[word] = 1
  })

  _.forIn(parsedText, (value, key) => {
    if (value < 3) return
    const word = {
      word: key,
      count: value
    }
    repetitiveWords.push(word)
  })
  return _.orderBy(repetitiveWords, ['count'], ['desc'])
}