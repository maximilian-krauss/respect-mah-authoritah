const { createServer } = require('https')
const port = process.argv[2] || 8043
const { readFileSync } = require('fs')
const { join } = require('path')
const options = {
  key: readFileSync(join(__dirname, 'certs', 'server', 'privkey.pem')),
  cert: readFileSync(join(__dirname, 'certs', 'server', 'fullchain.pem'))
}

function app (_req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.end('Encrypting all the things')
}

const server = createServer(options, app).listen(port, () => {
  const port = server.address().port
  console.log('Listening on https://' + server.address().address + ':' + port)
})
