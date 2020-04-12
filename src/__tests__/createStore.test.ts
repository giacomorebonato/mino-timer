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
  let store: TStore

  beforeAll(() => {
    store = createStore()
  })
  describe('changeName()', () => {
    it('changes name of the new exercise', () => {
      store.changeName('test')
      expect(store.newTimer.name).toBe('test')
    })
  })
  describe('changeExerciseTime()', () => {
    beforeAll(() => {
      store.changeExerciseTime(20)
    })
    it('changes the time of the new exercise', () => {
      expect(store.newTimer.exerciseTime).toBe(20)
    })

    it('changes the seconds left', () => {
      expect(store.newTimer.secondsLeft).toBe(20)
    })
  })
  it('returns an object', () => {
    expect(typeof store).toBe('object')
  })

  describe('startTimer()', () => {
    beforeAll(() => {
      store.startTimer()
    })

    it('executes Tone.start()', () => {
      expect(Tone.start).toHaveBeenCalled()
    })
  })
})
