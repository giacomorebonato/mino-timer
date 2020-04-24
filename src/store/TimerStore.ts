import { proxy } from 'comlink'
import * as Tone from 'tone'
import { speak } from '../lib'
import { getTimerWorker } from '../workers/getTimerWorker'
import { TimerWorker } from '../workers/timer-worker'
import { BaseStore } from './BaseStore'

export class TimerStore extends BaseStore {
  idle = false
  synth?: Tone.Synth
  timerWorker?: TimerWorker

  clearPerformance() {
    this.root.round.rounds = new Map()
    this.root.round.current.clear()
  }

  async stopPerformance() {
    this.idle = false
    const currentRound = this.root.round.current

    if (currentRound.exercise) {
      currentRound.exercise.secondsLeft = currentRound.exercise.exerciseTime
    }

    if (this.timerWorker) {
      try {
        await this.timerWorker.clearInterval()
      } catch (error) {
        this.log('Proxy is already released.')
      }
    }
  }

  updateSeconds(exercise: ExerciseData, isRecovery: boolean) {
    return proxy((secondsLeft: number) => {
      this.log(`Seconds left ${secondsLeft}`)
      this.log(`Recovery: ${isRecovery}`)

      exercise[isRecovery ? 'recoverySecondsLeft' : 'secondsLeft'] = secondsLeft

      if (secondsLeft > 0 && secondsLeft < 4) {
        this.synth!.triggerAttackRelease('C4', '0.2')
      }

      if (secondsLeft === 0) {
        this.synth!.triggerAttackRelease('G4', '0.4')

        setTimeout(() => {
          exercise.secondsLeft = exercise.exerciseTime
          this.nextExercise()
        }, 1000)
      }
    })
  }

  nextExercise() {
    const { current, rounds } = this.root.round

    if (!current.round) {
      throw Error('Undefined current round.')
    }
    if (!current.exercise) {
      throw Error('Undefined current exercise.')
    }

    if (current.isRecovery) {
      const index = current.round.exercises.findIndex(
        (item) => item === current.exercise
      )

      if (index < current.round.exercises.length - 1) {
        current.exercise = current.round.exercises[index + 1]
      } else {
        if (rounds.has(current.round.id + 1)) {
          const nextRound = rounds.get(current.round.id + 1)!
          current.round = nextRound
          current.exercise = nextRound.exercises[0]
        } else {
          speak('Congratulations! You completed your workout.')
          current.isRecovery = false
          current.exercise = null
          current.round = null
          this.idle = false
          return
        }
      }
    }

    current.isRecovery = !current.isRecovery

    this.stopPerformance()
  }

  async playSoundsBeforeStart() {
    return new Promise(async (resolve) => {
      await this.timerWorker!.runTimer(
        5,
        proxy((beginningSeconds: number) => {
          if (beginningSeconds > 1) {
            this.synth!.triggerAttackRelease('C4', '0.2')
          } else if (beginningSeconds === 1) {
            this.synth!.triggerAttackRelease('G4', '0.4')
          } else {
            resolve()
          }
        })
      )
    })
  }

  async startExercise() {
    const { current, rounds } = this.root.round

    if (!rounds.size) return
    this.idle = true

    if (!current.round) {
      const firstRound = rounds.get(1)!
      current.round = firstRound
      current.exercise = firstRound.exercises[0]
    }

    const StoreTimerWorker = getTimerWorker()

    this.timerWorker = await new StoreTimerWorker()

    this.log('Starting')
    this.log(`Round: ${current.round}`)
    this.log(`Exercise: ${current.exercise}`)

    if (!current.round) {
      throw Error('Undefined current round.')
    }
    if (!current.exercise) {
      throw Error('Undefined current exercise.')
    }

    await speak(
      current.isRecovery
        ? `Rest for ${current.exercise.recoverySecondsLeft} seconds.`
        : `Get ready for ${current.exercise.secondsLeft} seconds of ${current.exercise.name}.`
    )

    const updateSeconds = this.updateSeconds(
      current.exercise,
      current.isRecovery
    )

    if (!current.isRecovery) {
      await this.playSoundsBeforeStart()
    }

    await this.timerWorker.runTimer(
      current.exercise.exerciseTime,
      proxy((secondsLeft: number) => updateSeconds(secondsLeft))
    )
  }
}
