const tape = require("tape");
const jsonist = require("jsonist");

const PORT = (process.env.PORT =
  process.env.PORT || require("get-PORT-sync")());
const server = require("./server");

const urlBase = `http://localhost:${PORT}`;

tape("should respond hello", t => {
  jsonist.get(urlBase, (err, body) => {
    if (err) t.error(err);

    t.equal(body.msg, "hello");
    t.end();
  });
});

tape("should respond user-agent", t => {
  const opts = { headers: { "User-Agent": "tape" } };
  jsonist.get(`${urlBase}/user-agent`, opts, (err, body) => {
    if (err) t.error(err);

    t.equal(body.ua, "tape");
    t.end();
  });
});

tape("should respond b64", t => {
  jsonist.get(`${urlBase}/b64/hello`, (err, body) => {
    if (err) t.error(err);

    t.equal(body.b64, "aGVsbG8=");
    t.end();
  });
});

tape('should respond repetitive-word', (t) => {
  const data = {
    text: 'I felt happy because I saw the others were happy and because I knew I should feel happy, but I wasn’t really happy.'
  }
  jsonist.post(`${urlBase}/repetitive-word`, data, (err, body) => {
    if (err) t.error(err)
    t.equal(body[0].count, 4)
    t.equal(body[0].word, 'happy')
    t.end()
  })
})

tape('should respond comment-words', (t) => {
  const data = {
    comment: 'If <branch> is specified, git rebase will perform an automatic git switch <branch> before doing anything else.'
  }
  jsonist.post(`${urlBase}/comment-words`, data, (err, body) => {
    if (err) t.error(err)
    t.equal(body.count, 17)
    t.end()
  })
})

tape("cleanup", function(t) {
  server.close();
  t.end();
});
