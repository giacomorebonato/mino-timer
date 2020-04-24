import { RootStore } from '../index'
jest.mock('comlink')
jest.mock('../../workers/getTimerWorker', () => ({
  getTimerWorker: () => require('../workers/timer-worker').TimerWorker
}))
jest.mock('../../workers/timer-worker', () => ({
  TimerWorker: jest.fn(() => ({
    runTimer: async () => {}
  }))
}))

jest.mock('tone', () => ({
  start: jest.fn(),
  Synth: class Synth {
    toDestination() {
      return {
        triggerAttackRelease: () => {}
      }
    }
  }
}))

describe('rounds', () => {
  describe('moveExercise()', () => {
    let store: RootStore
    beforeAll(() => {
      store = new RootStore()
    })
    it('moves an experience UP and DOWN', () => {
      const id1 = store.round.addExercise()
      const id2 = store.round.addExercise()
      const id3 = store.round.addExercise()
      const exercises = store.round.rounds.get(1)?.exercises
      expect(exercises).not.toBeUndefined()
      expect(exercises![0].id).toBe(id1)
      expect(exercises![1].id).toBe(id2)
      expect(exercises![2].id).toBe(id3)
      store.round.moveExercise(1, id2, 'DOWN')
      expect(exercises![0].id).toBe(id1)
      expect(exercises![1].id).toBe(id3)
      expect(exercises![2].id).toBe(id2)
    })
  })

  describe('addExercise()', () => {
    let store: RootStore
    beforeAll(() => {
      store = new RootStore()
    })
    it("creates a round if it doesn't exist", () => {
      const id = store.exercise.newExercise.id
      store.exercise.newExercise.round = 2
      store.round.addExercise()
      expect(store.round.rounds.get(2)!.exercises[0].id).toEqual(id)
    })
    it('adds exercises to an existing round', () => {
      const id = store.exercise.newExercise.id
      store.exercise.newExercise.round = 2
      store.round.addExercise()
      expect(store.round.rounds.get(2)!.exercises[1].id).toEqual(id)
    })
  })
})
