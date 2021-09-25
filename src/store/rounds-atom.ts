import debug from 'debug'
import { useAtom } from 'jotai'
import { atomWithImmer } from 'jotai/immer'
import { DEFAULT_RECOVERY_TIME } from './config'

const log = debug('round')

export const roundsAtom = atomWithImmer({
  counter: 1,
  rounds: new Map<Number, RoundData>()
})

export const useRounds = () => {
  const [rounds, setRounds] = useAtom(roundsAtom)

  const addExercise = (exercise: ExerciseData) => {
    setRounds((rounds) => {
      rounds.counter++
    })

    if (!rounds.rounds.has(exercise.round)) {
      log(`Creating round ${exercise.round}`)

      setRounds((rounds) => {
        rounds.rounds.set(exercise.round, {
          id: exercise.round,
          exercises: [exercise],
          rest: {
            recoveryTime: DEFAULT_RECOVERY_TIME,
            secondsLeft: DEFAULT_RECOVERY_TIME
          },
          repetitions: 1
        })
      })
    } else {
      log(`Adding exercise to round ${exercise.round}`)

      setRounds((rounds) => {
        rounds.rounds.get(exercise.round)!.exercises.push(exercise)
      })
    }

    // this.updateCache()
    const addedId = exercise.id

    this.root.exercise.newExercise = {
      ...newExercise
    }

    return addedId
  }

  return {
    addExercise
  }
}
