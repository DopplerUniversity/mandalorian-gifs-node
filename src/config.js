import fs from 'fs'
import dotenv from 'dotenv'
import log from './logger.js'

if (fs.existsSync('.env')) {
  log.app('[info]: Configuration loaded from .env file')
  dotenv.config()
} else if (process.env.DOPPLER_PROJECT) {
  log.app(`[info]: Configuration loaded from Doppler (${process.env.DOPPLER_PROJECT} => ${process.env.DOPPLER_CONFIG})`)
}

const CLEAN_VARS = ['GIPHY_API_KEY']

class AppConfig {
  constructor(env) {
    this.GIPHY_API_KEY = env.GIPHY_API_KEY
    this.GIPHY_TAG = env.GIPHY_TAG || AppConfig.configError('GIPHY_TAG')
    this.GIPHY_RATING = env.GIPHY_RATING || AppConfig.configError('GIPHY_RATING')

    this.NODE_ENV = env.NODE_ENV || 'production'
    this.LOGGING = env.LOGGING || AppConfig.configError('LOGGING')

    this.HOSTNAME = env.HOSTNAME || AppConfig.configError('HOSTNAME')
    this.PORT = env.PORT || AppConfig.configError('PORT')

    AppConfig.cleanEnv()
  }

  static configError(envVar) {
    log.error(`Required environment variable ${envVar} is not set or invalid. Aborting.\n`)
    process.exit(1)
  }

  static cleanEnv() {
    log.app('Scrubbing secrets from process.env')
    CLEAN_VARS.forEach(key => {
      delete process.env[key]
    })
  }
}

const CONFIG = new AppConfig(process.env)
export default CONFIG
