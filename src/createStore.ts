import { proxy, wrap } from 'comlink'
import * as Tone from 'tone'

const worker = new Worker('./workers/timer-worker', {
  name: 'timer-worker',
  type: 'module'
})
const workerApi = wrap<import('./workers/timer-worker').TimerWorker>(worker)

const synth = new Tone.Synth().toMaster()
const DEFAULT_EXERCISE_TIME = 30
const DEFAULT_RECOVERY_TIME = 15

export const createStore = () => ({
  newTimer: {
    id: 1,
    name: 'Squats',
    recoveryTime: DEFAULT_RECOVERY_TIME,
    recoverySecondsLeft: DEFAULT_RECOVERY_TIME,
    exerciseTime: DEFAULT_EXERCISE_TIME,
    secondsLeft: DEFAULT_EXERCISE_TIME,
    start: false
  } as TimerData,
  runningTimer: 0,
  timers: [] as TimerData[],
  changeName(name: string) {
    this.newTimer.name = name
  },
  changeExerciseTime(seconds: number) {
    this.newTimer.secondsLeft = seconds
    this.newTimer.exerciseTime = seconds
  },
  changeRecoveryTime(seconds: number) {
    this.newTimer.recoveryTime = seconds
    this.newTimer.recoverySecondsLeft = seconds
  },
  resetTimer(timer: TimerData) {
    timer.start = false
    timer.secondsLeft = timer.exerciseTime
    timer.recoverySecondsLeft = timer.recoveryTime
  },
  addTimer() {
    this.timers.push(this.newTimer)
    this.newTimer = {
      id: this.newTimer.id + 1,
      name: '',
      exerciseTime: this.newTimer.exerciseTime,
      recoveryTime: this.newTimer.recoveryTime,
      recoverySecondsLeft: this.newTimer.recoverySecondsLeft,
      secondsLeft: this.newTimer.secondsLeft,
      start: false
    }
  },
  startTimer(currentTimer?: TimerData, isRecovery = false) {
    if (!this.timers.length) return

    const timer = currentTimer || this.timers[0]

    timer.start = true

    workerApi.runTimer(
      timer.exerciseTime,
      proxy((secondsLeft) => {
        timer[isRecovery ? 'recoverySecondsLeft' : 'secondsLeft'] = secondsLeft

        if (secondsLeft === 0) {
          synth.triggerAttackRelease('G4', '0.6')

          if (this.runningTimer === this.timers.length - 1 && isRecovery) {
            this.resetTimer(timer)
            return
          }

          // Start the next timer
          if (isRecovery) {
            this.resetTimer(timer)
            this.runningTimer++
            this.startTimer(this.timers[this.runningTimer])
          } else {
            // Run recovery time for current timer
            this.startTimer(this.timers[this.runningTimer], true)
          }

          return
        }

        if (secondsLeft > 0 && secondsLeft < 4) {
          synth.triggerAttackRelease('C4', '0.2')
        }
      })
    )
  }
})

export type TStore = ReturnType<typeof createStore>
