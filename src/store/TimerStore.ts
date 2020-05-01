import { proxy } from 'comlink'
import { action, observable } from 'mobx'
import * as Tone from 'tone'
import { speak } from '../lib'
import { getTimerWorker } from '../workers/getTimerWorker'
import type { TimerWorker } from '../workers/timer-worker'
import { BaseStore } from './BaseStore'

export class TimerStore extends BaseStore {
  @observable
  idle = false
  synth = new Tone.Synth().toDestination()
  StoreTimerWorker = getTimerWorker()
  timerWorker?: TimerWorker

  async initWorker() {
    if (!this.timerWorker) {
      this.timerWorker = await new this.StoreTimerWorker()
    }
  }

  @action
  clearPerformance() {
    this.root.round.rounds.clear()
    this.root.round.current.clear()
  }

  @action
  async stopPerformance() {
    if (!this.timerWorker) return

    this.idle = false
    const currentRound = this.root.round.current

    if (currentRound.exercise) {
      currentRound.exercise.secondsLeft = currentRound.exercise.exerciseTime
    }

    await this.timerWorker.clearInterval()
  }

  private createTimeUpdater(exercise: ExerciseData, isRecovery: boolean) {
    return proxy((secondsLeft: number) => {
      this.log(`Seconds left ${secondsLeft}`)
      this.log(`Recovery: ${isRecovery}`)

      if (this.timerWorker && !this.idle) {
        this.timerWorker.clearInterval()
        return
      }

      exercise[isRecovery ? 'recoverySecondsLeft' : 'secondsLeft'] = secondsLeft

      if (secondsLeft > 0 && secondsLeft < 4) {
        this.synth.triggerAttackRelease('C4', '0.2')
      }

      if (secondsLeft === 0) {
        this.synth.triggerAttackRelease('G4', '0.4')

        setTimeout(() => {
          exercise.secondsLeft = exercise.exerciseTime
          this.nextExercise()
        }, 1000)
      }
    })
  }

  @action
  nextExercise() {
    this.log('nextExercise')
    const { current, rounds } = this.root.round

    if (!current.round || !current.exercise) {
      return
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

    this.startExercise()
  }

  private async playSoundsBeforeStart() {
    return new Promise(async (resolve) => {
      if (!this.timerWorker) {
        throw new Error('You cannot play sound with no worker')
      }

      await this.timerWorker.runTimer(
        5,
        proxy((beginningSeconds: number) => {
          if (this.timerWorker && !this.idle) {
            this.timerWorker.clearInterval()
            resolve()
          }
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

  @action
  private checkCurrentRound() {
    const { current, rounds } = this.root.round

    if (!current.round) {
      if (!current.round && rounds.has(1)) {
        current.round = rounds.get(1)!
      }

      if (!current.round) {
        this.log('There is no created round')
        return false
      }
    }

    if (!current.exercise) {
      if (!current.round.exercises.length) {
        this.log("You can't have a round without exercises")
        return false
      }

      current.exercise = current.round.exercises[0]
    }

    return true
  }

  @action
  async startExercise() {
    const { current } = this.root.round

    if (!this.checkCurrentRound()) return

    this.idle = true
    const currentExercise = current.exercise!
    const currentRound = current.round!

    this.log('Starting')
    this.log(`Round: ${currentRound.id}`)
    this.log(`Exercise: ${currentExercise.name}`)

    const time =
      currentExercise[current.isRecovery ? 'recoveryTime' : 'exerciseTime']

    await speak(
      current.isRecovery
        ? `Rest for ${time} seconds.`
        : `Get ready for ${time} seconds of ${currentExercise.name}.`
    )

    if (!current.isRecovery) {
      await this.playSoundsBeforeStart()
    }

    const updateSeconds = this.createTimeUpdater(
      currentExercise,
      current.isRecovery
    )

    if (!this.timerWorker) {
      throw new Error('You cannot start timer with no worker')
    }

    await this.timerWorker.runTimer(time, proxy(updateSeconds))
  }
}
