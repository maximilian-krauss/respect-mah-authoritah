const https = require('https')
const port = process.argv[2] || 8043
const hostname = process.argv[3]
const url = `https://${hostname}:${port}/`

https.get(url, res => res.pipe(process.stdout)).on('error', console.error)
