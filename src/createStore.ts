import { proxy, releaseProxy, Remote, wrap } from 'comlink'
import debug from 'debug'
import * as Tone from 'tone'
import { TimerWorker, TimerWorkerType } from './workers/timer-worker'

const log = debug('createStore')
const worker = new Worker('./workers/timer-worker', {
  name: 'timer-worker',
  type: 'module'
})
const StoreTimerWorker = wrap<TimerWorkerType>(worker)

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
  clearTimers() {
    this.timers = []
    this.runningTimer = 0
  },
  stopTimers() {
    this.timeWorker.clearInterval()
    this.timeWorker[releaseProxy]()
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
  updateSeconds(timer: TimerData, isRecovery: boolean) {
    return proxy((secondsLeft: number) => {
      log(`Seconds left ${secondsLeft}`)

      timer[isRecovery ? 'recoverySecondsLeft' : 'secondsLeft'] = secondsLeft

      if (secondsLeft === 0) {
        synth.triggerAttackRelease('G4', '0.6')

        if (this.runningTimer === this.timers.length - 1 && isRecovery) {
          this.resetTimer(timer)
          return
        }

        if (isRecovery) {
          this.resetTimer(timer)
          this.runningTimer++

          log(`Start next timer with id ${this.timers[this.runningTimer].id}`)
          this.startTimer(this.timers[this.runningTimer])
        } else {
          log(`Start next timer with id ${this.timers[this.runningTimer].id}`)
          this.startTimer(this.timers[this.runningTimer], true)
        }

        return
      }

      if (secondsLeft > 0 && secondsLeft < 4) {
        synth.triggerAttackRelease('C4', '0.2')
      }
    })
  },
  timeWorker: (null as unknown) as Remote<TimerWorker>,
  async startTimer(currentTimer?: TimerData, isRecovery = false) {
    Tone.start()
    if (!this.timers.length) return

    this.timeWorker = await new StoreTimerWorker()

    const timer = currentTimer || this.timers[0]

    log(`Starting timer with id: ${timer.id}`)

    const updateSeconds = this.updateSeconds(timer, isRecovery)

    timer.start = true

    await this.timeWorker.runTimer(
      timer.exerciseTime,
      proxy((secondsLeft: number) => updateSeconds(secondsLeft))
    )
  }
})

export type TStore = ReturnType<typeof createStore>
