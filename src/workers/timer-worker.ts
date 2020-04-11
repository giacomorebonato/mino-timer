import { expose } from 'comlink'

type TimerCallback = (secondsLeft: number) => void

export const runTimer = (seconds: number, callback: TimerCallback) => {
  const interval = setInterval(() => {
    seconds--
    callback(seconds)

    if (!seconds) clearInterval(interval)
  }, 1000)
}

const exports = {
  runTimer
}

export type TimerWorker = typeof exports

expose(exports)
