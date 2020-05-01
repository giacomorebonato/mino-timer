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
  runTimer(seconds: number, onSecondsUpdate: TimerCallback): Promise<string> {
    log('runTimer start')

    return new Promise((resolve) => {
      this.intervalId = setInterval(
        async () => {
          seconds--

          if (seconds === 0) {
            this.clearInterval()
            resolve('Timer completed!')
          }

          await onSecondsUpdate(seconds)
        },
        process.env.NODE_ENV === 'test' ? 0 : 1000
      )
    })
  }
}
