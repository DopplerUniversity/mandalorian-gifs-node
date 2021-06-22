import express from 'express'
import { Config } from './config.js'
import log from './logger.js'
import giphy from './giphy.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const gif = await giphy.getRandomGIF(Config.GIPHY_API_KEY, Config.GIPHY_TAG, Config.GIPHY_RATING)
  res.render('index', {
    gif,
  })
})

router.get('/healthz', (req, res) => {
  const HEALTH_RESPONSES = [
    'I can bring you in warm, or I can bring you in cold.',
    'I like those odds.',
    'I’m a Mandalorian. Weapons are part of my religion.',
    'Stop touching things.',
    'Bad news. You can’t live here anymore.',
    'She’s no good to us dead.',
    'Wherever I go, he goes.',
  ]
  const response = HEALTH_RESPONSES[Math.floor(Math.random() * HEALTH_RESPONSES.length)]
  log.server('healthcheck: %s', response)
  res.send(HEALTH_RESPONSES[Math.floor(Math.random() * HEALTH_RESPONSES.length)])
})

export default router
