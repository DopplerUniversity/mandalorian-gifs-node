// import first to scrub environment variables prior to importing external packages

import path from 'path'
import express from 'express'
import logger from 'morgan'
import nunjucks from 'nunjucks'
import Config from './config.js'
import log from './logger.js'
import router from './router.js'

const dirname = path.dirname(new URL(import.meta.url).pathname)
const app = express()
app.set('views', path.join(dirname, 'views'))
app.set('view engine', 'nunjucks')
nunjucks.configure('src/views', {
  autoescape: true,
  express: app,
})

app.use(router)
app.use(express.static(path.join(dirname, 'public')))
app.use(logger(Config.LOGGING))

if (process.env.NODE_ENV === 'development') {
  log.app('App Config (displayed in development mode)')
  log.table(Config)
}

export default app
