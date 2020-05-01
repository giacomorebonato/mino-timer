import debug from 'debug'

const log = debug('time-worker')
type TimerCallback = (secondsLeft: number) => void

export class TimerWorker {
  intervalId?: NodeJS.Timeout
  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
    this.intervalId = undefined
  }
  runTimer(seconds: number, onSecondsUpdate: TimerCallback) {
    log('runTimer start')

    this.intervalId = setInterval(async () => {
      seconds--

      if (seconds === 0) {
        this.clearInterval()
      }

      await onSecondsUpdate(seconds)
    }, 1000)
  }
}
