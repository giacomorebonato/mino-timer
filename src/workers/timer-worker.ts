import { expose } from 'comlink'
import debug from 'debug'

const log = debug('time-worker')
type TimerCallback = (secondsLeft: number) => void

export const runTimer = async (seconds: number, callback: TimerCallback) => {
  log('runTimer start')

  const interval = setInterval(async () => {
    seconds--

    if (seconds === 0) clearInterval(interval)

    await callback(seconds)
  }, 1000)
}

const exports = {
  runTimer
}

export type TimerWorker = typeof exports

expose(exports)
