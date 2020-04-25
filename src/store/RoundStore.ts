import arrayMove from 'array-move'
import { action, computed, observable } from 'mobx'
import { BaseStore } from './BaseStore'
import type { RootStore } from './index'

export class RoundStore extends BaseStore {
  @observable
  counter = 0

  @observable
  rounds = new Map<Number, RoundData>()

  @observable
  current = {
    clear() {
      this.round = null
      this.isRecovery = false
      this.exercise = null
    },
    exercise: null,
    round: null,
    isRecovery: false
  } as CurrentRound

  @computed
  get workoutLink() {
    const obj = Object.create({})
    this.rounds.forEach((round) => {
      if (!obj.hasOwnProperty(round.id.toString())) {
        obj[round.id] = {
          exercises: []
        }
      }
    })

    const base64 = btoa(JSON.stringify(this.rounds))
    return `http://mino-timer.now.sh/workout/${base64}`
  }

  @action
  addExercise() {
    const { newExercise } = this.root.exercise

    if (!this.rounds.has(newExercise.round)) {
      this.log(`Creating round ${newExercise.round}`)
      this.rounds.set(newExercise.round, {
        id: newExercise.round,
        exercises: [newExercise],
        rest: {
          recoveryTime: this.DEFAULT_RECOVERY_TIME,
          secondsLeft: this.DEFAULT_RECOVERY_TIME
        },
        repetitions: 1
      })
    } else {
      this.log(`Adding exercise to round ${newExercise.round}`)
      this.rounds.get(newExercise.round)!.exercises.push(newExercise)
    }

    this.updateCache()
    const addedId = newExercise.id
    this.counter++

    this.root.exercise.newExercise = {
      ...newExercise,
      uid: this.counter
    }

    return addedId
  }

  @action
  moveExercise(roundId: number, exerciseUid: number, direction: 'UP' | 'DOWN') {
    this.log('moveExercise')
    const round = this.rounds.get(roundId)

    if (!round) return

    const index = round.exercises.findIndex((item) => item.uid === exerciseUid)

    if (
      (index === 0 && direction === 'UP') ||
      (index === round.exercises.length - 1 && direction === 'DOWN')
    ) {
      return
    }

    this.current.clear()

    this.log('Mutating array')

    arrayMove.mutate(
      round.exercises,
      index,
      direction === 'UP' ? index - 1 : index + 1
    )
  }

  @action
  removeExercise(roundId: number, exerciseUid: number) {
    const round = this.rounds.get(roundId)

    if (!round) return
    round.exercises = round.exercises.filter((e) => e.uid !== exerciseUid)

    if (!round.exercises.length) {
      this.rounds.delete(round.id)
    }

    this.updateCache()
  }

  updateCache() {
    localStorage.setItem('rounds', JSON.stringify(this.rounds))
  }

  @computed
  get savedRounds(): { [key: string]: RoundData } | null {
    const savedRounds = localStorage.getItem('rounds')

    if (savedRounds) {
      return JSON.parse(savedRounds)
    }

    return null
  }

  constructor(props: RootStore) {
    super(props)

    let exerciseId = 1

    if (this.savedRounds) {
      Object.keys(this.savedRounds).forEach((key) => {
        const round: RoundData = this.savedRounds![key]

        this.rounds.set(parseInt(key), round)
        exerciseId += round.exercises.reduce(
          (acc: number, value: ExerciseData) =>
            value.uid > acc ? value.uid + 1 : acc,
          exerciseId
        )
      })
    }
  }
}
