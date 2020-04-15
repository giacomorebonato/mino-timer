import { createStore, TStore } from '../createStore'

jest.mock('tone', () => ({
  start: jest.fn(),
  Synth: class Synth {
    toMaster() {
      return {
        triggerAttackRelease: () => {}
      }
    }
  }
}))

const Tone = require('tone')

describe('createStore', () => {
  describe('changeName()', () => {
    it('changes name of the new exercise', () => {
      const store = createStore()
      store.changeName('test')
      expect(store.newExercise.name).toBe('test')
    })
  })
  describe('changeExerciseTime()', () => {
    let store: TStore
    beforeAll(() => {
      store = createStore()
      store.changeExerciseTime(20)
    })
    it('changes the time of the new exercise', () => {
      expect(store.newExercise.exerciseTime).toBe(20)
    })

    it('changes the seconds left', () => {
      expect(store.newExercise.secondsLeft).toBe(20)
    })
  })
  it('returns an object', () => {
    const store = createStore()
    expect(typeof store).toBe('object')
  })

  describe('addExercise()', () => {
    let store: TStore
    beforeAll(() => {
      store = createStore()
    })

    it("creates a round if it doesn't exist", () => {
      const id = store.newExercise.id
      store.newExercise.round = 2
      store.addExercise()

      expect(store.rounds.get(2)!.exercises[0].id).toEqual(id)
    })

    it('adds exercises to an existing round', () => {
      const id = store.newExercise.id
      store.newExercise.round = 2
      store.addExercise()

      expect(store.rounds.get(2)!.exercises[1].id).toEqual(id)
    })
  })

  describe('startTimer()', () => {
    describe('when exercises are created', () => {
      it('sets idle to true', () => {
        const store = createStore()
        store.addExercise()
        store.startExercise()
        expect(store.idle).toBe(true)
      })
    })

    describe('when no exercises are created', () => {
      it("doesn't set idle to false", () => {
        const store = createStore()
        store.startExercise()
        expect(store.idle).toBe(false)
      })
    })
  })

  describe('stopTimers()', () => {
    let store: TStore
    beforeAll(() => {
      store = createStore()
      store.startExercise()
      store.stopExercise()
    })
    it('sets idle to false', () => {
      expect(store.idle).toBe(false)
    })
  })
})
