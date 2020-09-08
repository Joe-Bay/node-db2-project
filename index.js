const server = require('./api/server')

const port = process.env.port || 8000

server.listen(port, () => console.log(`**** Server Listening on port ${port} ****`))
