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
  }

  @action
  async stopPerformance() {
    if (!this.timerWorker) return

    await this.timerWorker.clearInterval()
    this.idle = false
  }

  timeUpdater(isRecovery?: boolean, exercise?: ExerciseData) {
    return proxy((secondsLeft: number) => {
      if (!this.idle) return

      if (exercise) {
        exercise[
          isRecovery ? 'recoverySecondsLeft' : 'secondsLeft'
        ] = secondsLeft
      }

      if (secondsLeft > 0 && secondsLeft < 4) {
        this.synth.triggerAttackRelease('C4', '0.2')
      }

      if (secondsLeft === 0) {
        this.synth.triggerAttackRelease('G4', '0.4')
      }
    })
  }

  @action
  async startPerformance() {
    await this.initWorker()

    this.idle = true

    for (let [roundId, roundData] of this.root.round.rounds) {
      this.log(`Round: ${roundId}`)
      if (!this.idle) break

      for (let i = 0; i < roundData.exercises.length; i++) {
        if (!this.timerWorker) {
          throw new Error('You cannot start timer with no worker')
        }
        if (!this.idle) break

        const exercise = roundData.exercises[i]

        await speak(
          `Get ready for ${exercise.exerciseTime} seconds of ${exercise.name}.`
        )
        await this.timerWorker.runTimer(5, this.timeUpdater())
        await this.timerWorker.runTimer(
          exercise.exerciseTime,
          this.timeUpdater(false, exercise)
        )
        await speak(`Rest for ${exercise.recoveryTime} seconds.`)
        await this.timerWorker.runTimer(
          exercise.recoveryTime,
          this.timeUpdater(true, exercise)
        )
      }
    }

    this.idle = false
    speak('Congratulations! You completed your workout.')
  }
}
