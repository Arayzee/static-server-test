const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2]

if (!port) {
  console.log('请输入端口号，如："node server.js 8888"')
  process.exit(1)
}

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url)
  const path = parsedUrl.pathname

  const filePath = path === '/' ? 'index.html' : path
  const suffix = filePath.substring(filePath.lastIndexOf('.'))
  console.log(suffix)
  let content
  const hashMap = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'text/josn',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif'
  }
  response.setHeader('Content-Type', hashMap[suffix] || 'text/html' + '; charset=utf-8')
  try {
    content = fs.readFileSync(`./public/${filePath}`)
    response.statusCode = 200
  } catch (err) {
    content = '您所请求的资源不存在！'
    response.statusCode = 404
  }
  response.write(content)
  response.end()
})

server.listen(port)
console.log(`监听端口${port}成功\n请访问http://localhost:${port}`)