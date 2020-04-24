import { BaseStore } from './BaseStore'

export class ExerciseStore extends BaseStore {
  newExercise = {
    id: 1,
    name: 'Squats',
    recoveryTime: this.DEFAULT_RECOVERY_TIME,
    recoverySecondsLeft: this.DEFAULT_RECOVERY_TIME,
    exerciseTime: this.DEFAULT_EXERCISE_TIME,
    secondsLeft: this.DEFAULT_EXERCISE_TIME,
    round: 1 as RoundId
  } as ExerciseData

  changeName(name: string) {
    this.log('changeName', name)
    this.newExercise.name = name
  }

  changeDestinationRound(round: RoundId) {
    this.newExercise.round = round
  }

  changeExerciseTime(seconds: number) {
    this.newExercise.secondsLeft = seconds
    this.newExercise.exerciseTime = seconds
  }

  changeRecoveryTime(seconds: number) {
    this.newExercise.recoveryTime = seconds
    this.newExercise.recoverySecondsLeft = seconds
  }
}
