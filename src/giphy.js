import axios from 'axios'
import gifs from './gifs.js'
import log from './logger.js'

class GIF {
  constructor(data) {
    this.id = data.id
    this.url = data.url
    this.title = data.title
    this.rating = data.rating
    this.mp4 = data.mp4
    this.width = data.width
    this.height = data.height
  }

  toJSON() {
    const { id, url, title, rating, mp4, width, height } = this
    return { id, url, title, rating, mp4, width, height }
  }
}
class GIFCache {
  constructor(cache) {
    this.cache = cache || {}
    this.ids = []

    cache.forEach(gif => {
      this.cache[gif.id] = gif
      this.ids.push(gif.id)
    })
  }

  getRandom() {
    return this.cache[Math.floor(Math.random() * this.ids.length)]
  }

  add(gif) {
    this.cache[gif.id] = gif
    this.ids.push(gif.id)
  }
}

const cache = new GIFCache(gifs)
async function getRandomGIF(apiKey, tag, rating) {
  if (!apiKey) {
    log.app('GIPHY API key not set. Serving random cached response.')
    return cache.getRandom()
  }
  if (apiKey === 'testing') {
    log.app('GIPHY API testing key used. Serving random cached response.')
    return cache.getRandom()
  }
  try {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${tag}&rating=${rating}`
    )
    const gif = new GIF({
      id: response.data.data.id,
      url: response.data.data.url,
      title: response.data.data.title,
      rating: response.data.data.rating,
      mp4: response.data.data.images.original_mp4.mp4,
      width: response.data.data.images.original_mp4.width,
      height: response.data.data.images.original_mp4.height,
    })
    cache.add(gif)
    return gif
  } catch (error) {
    log.error(`GIPHY API request failed: ${error}`, 'Serving random cached response')
    return cache.getRandom()
  }
}
export default { getRandomGIF }
