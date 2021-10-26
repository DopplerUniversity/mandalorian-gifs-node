const CONFIG_VARS = [
  'DEBUG',
  'DEBUG_COLORS',
  'GIPHY_API_KEY',
  'GIPHY_RATING',
  'GIPHY_TAG',
  'HOSTNAME',
  'LOGGING',
  'NODE_ENV',
  'PORT',
]

const ENV_KEEP = ['NODE_ENV', 'DEBUG', 'DEBUG_COLORS']

class AppConfig {
  constructor() {
    CONFIG_VARS.forEach(key => {
      this[key] = process.env[key]

      if (!ENV_KEEP.includes(key)) {
        delete process.env[key]
      }
    })
  }
}

const CONFIG = new AppConfig()
export default CONFIG
