//standard https get request
const https = require('https')
const options = {
  hostname: 'whatever.com',
  port: 443,
  path: '/todos',
  method: 'GET'
}

const req = https.request(options, (res:any) => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', (d:any) => {
    process.stdout.write(d)
  })
})

req.on('error', (error:any) => {
  console.error(error)
})

req.end()