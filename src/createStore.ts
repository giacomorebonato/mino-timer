import * as Tone from 'tone'

const synth = new Tone.Synth().toMaster()

const DEFAULT_EXERCISE_TIME = 30
const DEFAULT_RECOVERY_TIME = 15

export const createStore = () => ({
  newTimer: {
    id: 1,
    name: 'Squats',
    recoveryTime: DEFAULT_RECOVERY_TIME,
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
  },
  addTimer() {
    this.timers.push(this.newTimer)
    this.newTimer = {
      id: this.newTimer.id + 1,
      name: '',
      exerciseTime: DEFAULT_EXERCISE_TIME,
      recoveryTime: DEFAULT_RECOVERY_TIME,
      secondsLeft: DEFAULT_EXERCISE_TIME,
      start: false
    }
  },
  startTimers() {
    if (!this.timers.length) return

    const interval = setInterval(() => {
      if (this.runningTimer >= this.timers.length) {
        this.runningTimer = 0
        clearInterval(interval)
        return
      }

      const timer = this.timers[this.runningTimer]

      if (timer.secondsLeft === 0) {
        timer.start = false
        timer.secondsLeft = timer.exerciseTime
        this.runningTimer++

        return
      }

      if (timer.secondsLeft < 5) {
        if (timer.secondsLeft === 1) {
          synth.triggerAttackRelease('G4', '0.6')
        } else {
          synth.triggerAttackRelease('C4', '0.2')
        }
      }

      timer.start = true
      timer.secondsLeft--
    }, 1000)
  }
})

export type TStore = ReturnType<typeof createStore>
