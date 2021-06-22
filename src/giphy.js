import fs from 'fs'
import path from 'path'
import axios from 'axios'
import log from './logger.js'

class GIF {
  constructor(data) {
    this.url = data.url
    this.title = data.title
    this.rating = data.rating
    this.mp4 = data.mp4
    this.width = data.width
    this.height = data.height
  }

  toJSON() {
    const { url, title, rating, mp4, width, height } = this
    return {
      url,
      title,
      rating,
      mp4,
      width,
      height,
    }
  }
}

class Cache {
  constructor(cache) {
    this.cache = cache || []
  }

  getGIF() {
    return this.cache[Math.floor(Math.random() * this.cache.length)]
  }

  addGIF(data) {
    if (this.cache.length <= 500) {
      this.cache.push(data)
    }
  }
}
const cacheFile = path.join(path.dirname(new URL(import.meta.url).pathname), 'data/gifs.json')
const cache = new Cache(JSON.parse(fs.readFileSync(cacheFile, 'utf8')))
async function getRandomGIF(apiKey, tag, rating) {
  const gif = await (async () => {
    if (!apiKey) {
      log.app('Config.GIPHY_API_KEY empty or invalid. Serving random cached response.')
      return Promise.resolve(cache.getGIF().data)
    }
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${tag}&rating=${rating}`
      )
      cache.getGIF(response.data)
      return response.data.data
    } catch (error) {
      log.error(`GIPHY API request failed: ${error}. Serving random cached response`)
      return Promise.resolve(cache.getGIF().data)
    }
  })()

  return new GIF({
    url: gif.url,
    title: gif.title,
    rating: gif.rating,
    mp4: gif.images.original_mp4.mp4,
    width: gif.images.original_mp4.width,
    height: gif.images.original_mp4.height,
  })
}

export default { getRandomGIF }
