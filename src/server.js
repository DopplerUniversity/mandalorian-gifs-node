import http from 'http'
import { Config } from './config.js'
import log from './logger.js'
import app from './app.js'

const httpServer = http.createServer(app).listen(Config.PORT, Config.HOSTNAME, () => {
  log.server(`Serving GIFs at http://${Config.HOSTNAME}:${Config.PORT}/`)
})

const onShutdown = code => {
  log.server(`\nReceived "${code}"`)
  log.server('Shutting down HTTP server')
  httpServer.close()
}

process.on('SIGINT', onShutdown)
process.on('SIGTERM', onShutdown)
