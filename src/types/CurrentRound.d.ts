type CurrentRound = {
  clear: () => void
  round: RoundData | null
  exercise: ExerciseData | null
  isRecovery: boolean
}
