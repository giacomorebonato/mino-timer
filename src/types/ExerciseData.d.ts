type RoundId = 1 | 2 | 3 | 4 | 5
interface ExerciseData {
  id: number
  uid: number = 0
  name: string
  exerciseTime: number
  recoveryTime: number
  recoverySecondsLeft: number
  secondsLeft: number
  round: RoundId
}
