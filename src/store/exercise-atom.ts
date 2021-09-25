import { useAtom } from 'jotai'
import { atomWithImmer } from 'jotai/immer'
import { DEFAULT_EXERCISE_TIME, DEFAULT_RECOVERY_TIME } from './config'

export const exerciseAtom = atomWithImmer({
  id: 1,
  name: 'Squats',
  recoveryTime: DEFAULT_RECOVERY_TIME,
  recoverySecondsLeft: DEFAULT_RECOVERY_TIME,
  exerciseTime: DEFAULT_EXERCISE_TIME,
  secondsLeft: DEFAULT_EXERCISE_TIME,
  round: 1 as RoundId
} as ExerciseData)

export const useExercise = () => {
  const [exercise, setExercise] = useAtom(exerciseAtom)

  const editExercise = (changes: Partial<ExerciseData>) => {
    for (const [key, value] of Object.entries(changes)) {
      setExercise((exercise) => {
        Object.assign(exercise, {
          [key]: value
        })
      })
    }
  }

  return {
    exercise,
    editExercise
  }
}
