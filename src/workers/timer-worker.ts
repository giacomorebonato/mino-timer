import { expose } from 'comlink'
import debug from 'debug'

const log = debug('time-worker')
type TimerCallback = (secondsLeft: number) => void

export class TimerWorker {
  intervalId = (null as unknown) as NodeJS.Timeout
  clearInterval() {
    clearInterval(this.intervalId)
  }
  async runTimer(seconds: number, callback: TimerCallback) {
    log('runTimer start')

    this.intervalId = setInterval(async () => {
      seconds--

      if (seconds === 0) clearInterval(this.intervalId)

      await callback(seconds)
    }, 1000)
  }
}

export type TimerWorkerType = typeof TimerWorker

expose(TimerWorker)
