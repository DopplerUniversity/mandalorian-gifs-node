// Set default for debug library
import debug from 'debug'

debug.enable(process.env.DEBUG || 'app: error:')

const table = (obj, displayEmpty = false) => {
  const rows = []
  Object.keys(obj).forEach(key => {
    let value = obj[key] ? obj[key] : ''
    if (value === '' && !displayEmpty) {
      return
    }
    if (key.match(/KEY|TOKEN|SECRET|CERT/)) {
      value = value.length > 0 ? '*'.repeat(12) : ''
    }
    rows.push({ KEY: key, VALUE: value })
  })
  console.table(rows)
}

export default {
  app: debug('app:'),
  server: debug('server:'),
  error: debug('error:'),
  table,
}
