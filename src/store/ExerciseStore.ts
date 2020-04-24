import { action, observable } from 'mobx'
import { BaseStore } from './BaseStore'

export class ExerciseStore extends BaseStore {
  @observable
  newExercise = {
    id: 1,
    name: 'Squats',
    recoveryTime: this.DEFAULT_RECOVERY_TIME,
    recoverySecondsLeft: this.DEFAULT_RECOVERY_TIME,
    exerciseTime: this.DEFAULT_EXERCISE_TIME,
    secondsLeft: this.DEFAULT_EXERCISE_TIME,
    round: 1 as RoundId
  } as ExerciseData

  @action
  changeName(name: string) {
    this.log('changeName', name)
    this.newExercise.name = name
  }

  @action
  changeDestinationRound(round: RoundId) {
    this.newExercise.round = round
  }

  @action
  changeExerciseTime(seconds: number) {
    this.newExercise.secondsLeft = seconds
    this.newExercise.exerciseTime = seconds
  }

  @action
  changeRecoveryTime(seconds: number) {
    this.newExercise.recoveryTime = seconds
    this.newExercise.recoverySecondsLeft = seconds
  }
}
