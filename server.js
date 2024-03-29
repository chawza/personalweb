const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';

const NODE_ENV = process.env.NODE_ENV;
const port = parseInt(process.env.PORT); 
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

function setupImgSymlink() {
  const symLinkPath = path.join(process.cwd(), 'public', 'imgs');
  const linkTarget = process.env.ARTICLE_IMG_DIR;
  
  if (!fs.existsSync(symLinkPath)) {
    fs.symlink(linkTarget, symLinkPath, 'dir', (err) => {
      if (err) throw err
    });
    console.info(`Article imgs symlink has been created to ${linkTarget}`);
  }
}

app.prepare().then(() => {
  setupImgSymlink();
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
