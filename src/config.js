import fs from 'fs'
import dotenv from 'dotenv'

const configError = envVar => {
  console.error(`[error]: Required environment variable ${envVar} is not set or invalid. Aborting.\n`)
  process.exit(1)
}

const CONFIG_SOURCE = (() => {
  if (fs.existsSync('.env')) {
    dotenv.config()
    return '.env file'
  }

  if (process.env.DOPPLER_PROJECT) {
    return `Doppler (${process.env.DOPPLER_PROJECT} => ${process.env.DOPPLER_CONFIG})`
  }
  return 'System environment variables'
})()

class AppConfig {
  constructor(env) {
    this.GIPHY_API_KEY = env.GIPHY_API_KEY
    this.GIPHY_TAG = env.GIPHY_TAG || configError('GIPHY_TAG')
    this.GIPHY_RATING = env.GIPHY_RATING || configError('GIPHY_RATING')

    this.NODE_ENV = env.NODE_ENV || 'production'
    this.CONFIG_SOURCE = CONFIG_SOURCE
    this.LOGGING = env.LOGGING || configError('LOGGING')

    this.HOSTNAME = env.HOSTNAME || configError('HOSTNAME')
    this.PORT = env.PORT || configError('PORT')
  }
}

const Config = new AppConfig(process.env)
export { AppConfig, Config }
