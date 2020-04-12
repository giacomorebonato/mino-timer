import debug from 'debug'
import { detect } from 'detect-browser'

const log = debug('speak')
const browser = detect()

export const speak = (text: string) => {
  return new Promise((resolve, reject) => {
    if ('speechSynthesis' in window) {
      const ssu = new SpeechSynthesisUtterance(text)
      ssu.lang = 'en-US'

      if (browser!.os === 'iOS') {
        setTimeout(() => {
          resolve()
        }, 2000)
      } else {
        ssu.onend = () => {
          resolve()
        }
      }

      ssu.onerror = (error) => {
        debug(JSON.stringify(error))
        reject()
      }

      speechSynthesis.speak(ssu)
    } else {
      log('speechSynthesis not available')
    }
  })
}
