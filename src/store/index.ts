import { ExerciseStore } from './ExerciseStore'
import { RoundStore } from './RoundStore'
import { TimerStore } from './TimerStore'

export class RootStore {
  exercise: ExerciseStore
  round: RoundStore
  timer: TimerStore

  constructor() {
    this.exercise = new ExerciseStore(this)
    this.round = new RoundStore(this)
    this.timer = new TimerStore(this)
  }
}
