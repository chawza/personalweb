const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'

const NODE_ENV = process.env.NODE_ENV;
const port = parseInt(process.env.PORT); 
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const srcDir = path.join(process.cwd(), 'public', 'imgs');
const targetDir = path.join(process.cwd(), 'articles', 'imgs');

console.log(srcDir);
console.log(targetDir);

fs.symlink(targetDir, srcDir, 'dir', (err) => {
  if (err) throw err
});

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready ${NODE_ENV ? `${NODE_ENV} ` : ''}on http://${hostname}:${port}`);
  })
})
