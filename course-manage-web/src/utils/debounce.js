import { DEFAULT_DELAY } from './constants'

export function debounce(cb, delay = DEFAULT_DELAY) {
  let timeoutId

  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}
