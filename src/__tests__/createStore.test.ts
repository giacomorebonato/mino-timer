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

  describe('startTimer()', () => {
    let store: TStore
    beforeAll(() => {
      store = createStore()
      store.startTimer()
    })

    it('executes Tone.start()', () => {
      expect(Tone.start).toHaveBeenCalled()
    })

    describe('when no exercises are created', () => {
      it("doesn't set idle to false", () => {
        expect(store.idle).toBe(false)
      })
    })
  })

  describe('stopTimers()', () => {
    let store: TStore
    beforeAll(() => {
      store = createStore()
      store.startTimer()
      store.stopTimers()
    })
    it('sets idle to false', () => {
      expect(store.idle).toBe(false)
    })
  })
})
