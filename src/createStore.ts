import { proxy, releaseProxy, Remote } from 'comlink'
import debug from 'debug'
import * as Tone from 'tone'
import { speak } from './lib'
import { getTimerWorker } from './workers/getTimerWorker'
import { TimerWorker } from './workers/timer-worker'

const log = debug('createStore')

export const createStore = () => {
  const StoreTimerWorker = getTimerWorker()
  const synth = new Tone.Synth().toMaster()
  const DEFAULT_EXERCISE_TIME = 30
  const DEFAULT_RECOVERY_TIME = 15

  return {
    newExercise: {
      id: 1,
      name: 'Squats',
      recoveryTime: DEFAULT_RECOVERY_TIME,
      recoverySecondsLeft: DEFAULT_RECOVERY_TIME,
      exerciseTime: DEFAULT_EXERCISE_TIME,
      secondsLeft: DEFAULT_EXERCISE_TIME,
      start: false
    } as ExerciseData,
    rounds: {
      1: {
        exercises: [] as ExerciseData[]
      },
      2: {
        exercises: [] as ExerciseData[]
      },
      3: {
        exercises: [] as ExerciseData[]
      },
      4: {
        exercises: [] as ExerciseData[]
      }
    },
    idle: false,
    pausedTimer: 0,
    runningTimer: 0,
    timers: [] as ExerciseData[],
    changeName(name: string) {
      this.newExercise.name = name
    },
    clearTimers() {
      this.timers = []
      this.runningTimer = 0
    },
    stopTimers() {
      this.idle = false

      if (this.timeWorker) {
        this.timeWorker.clearInterval()
        this.timeWorker[releaseProxy]()
      }
      this.pausedTimer = this.runningTimer

      if (this.timers[this.runningTimer]) {
        this.timers[this.runningTimer].start = false
      }
    },
    changeExerciseTime(seconds: number) {
      this.newExercise.secondsLeft = seconds
      this.newExercise.exerciseTime = seconds
    },
    changeRecoveryTime(seconds: number) {
      this.newExercise.recoveryTime = seconds
      this.newExercise.recoverySecondsLeft = seconds
    },
    resetTimer(timer: ExerciseData) {
      this.stopTimers()
      timer.start = false
      timer.secondsLeft = timer.exerciseTime
      timer.recoverySecondsLeft = timer.recoveryTime
    },
    addTimer() {
      this.timers.push(this.newExercise)
      this.newExercise = {
        id: this.newExercise.id + 1,
        name: 'Squats',
        exerciseTime: this.newExercise.exerciseTime,
        recoveryTime: this.newExercise.recoveryTime,
        recoverySecondsLeft: this.newExercise.recoverySecondsLeft,
        secondsLeft: this.newExercise.secondsLeft,
        start: false
      }
    },
    updateSeconds(timer: ExerciseData, isRecovery: boolean) {
      return proxy((secondsLeft: number) => {
        log(`Seconds left ${secondsLeft}`)

        timer[isRecovery ? 'recoverySecondsLeft' : 'secondsLeft'] = secondsLeft

        if (secondsLeft === 0) {
          synth.triggerAttackRelease('G4', '0.6')

          if (this.runningTimer === this.timers.length - 1 && isRecovery) {
            this.resetTimer(timer)
            speak('Congratulations! You completed your workout.')
            this.idle = false
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
    async startTimer(currentTimer?: ExerciseData, isRecovery = false) {
      Tone.start()
      if (!this.timers.length) return
      this.idle = true

      this.timeWorker = await new StoreTimerWorker()

      let timer = currentTimer || this.timers[0]

      if (this.pausedTimer) {
        timer = this.timers[this.pausedTimer]
        this.pausedTimer = 0
      }

      log(`Starting timer with id: ${timer.id}`)

      await speak(
        isRecovery
          ? `Rest for ${timer.recoverySecondsLeft} seconds.`
          : `Get ready for ${timer.secondsLeft} seconds of ${timer.name}.`
      )

      const updateSeconds = this.updateSeconds(timer, isRecovery)

      timer.start = true

      await this.timeWorker.runTimer(
        isRecovery ? timer.recoveryTime : timer.exerciseTime,
        proxy((secondsLeft: number) => updateSeconds(secondsLeft))
      )
    }
  }
}

export type TStore = ReturnType<typeof createStore>
