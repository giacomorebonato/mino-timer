declare module 'comlink-loader!*' {
  // class WebpackWorker extends Worker {
  //   constructor()

  //   TimerWorker
  // }

  // export WebpackWorker
  class WebpackWorker extends Worker {
    constructor()

    TimerWorker
  }

  export = WebpackWorker

  // class TimerWorker {
  //   intervalId = (null as unknown) as NodeJS.Timeout
  //   clearInterval() {
  //     clearInterval(this.intervalId)
  //   }
  //   async runTimer(seconds: number, onSecondsUpdate: TimerCallback) {
  //     log('runTimer start')

  //     this.intervalId = setInterval(async () => {
  //       seconds--

  //       if (seconds === 0) {
  //         clearInterval(this.intervalId)
  //       }

  //       await onSecondsUpdate(seconds)
  //     }, 1000)
  //   }
  // }
}
