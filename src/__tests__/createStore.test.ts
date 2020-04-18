import { mocked } from 'ts-jest/utils'
import { createStore, TStore } from '../createStore'
import { TimerWorker } from '../workers/timer-worker'

jest.mock('comlink')
jest.mock('../workers/getTimerWorker', () => ({
  getTimerWorker: () => require('../workers/timer-worker').TimerWorker
}))
jest.mock('../workers/timer-worker', () => ({
  TimerWorker: jest.fn(() => ({
    runTimer: async () => {}
  }))
}))

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

describe('createStore', () => {
  describe('new experience', () => {
    let store: TStore
    beforeAll(() => {
      store = createStore()
      store.changeExerciseTime(20)
    })

    describe('changeName()', () => {
      it('changes name of the new exercise', () => {
        store.changeName('test')
        expect(store.newExercise.name).toBe('test')
      })
    })
    describe('changeExerciseTime()', () => {
      it('changes the time of the new exercise', () => {
        expect(store.newExercise.exerciseTime).toBe(20)
      })

      it('changes the seconds left', () => {
        expect(store.newExercise.secondsLeft).toBe(20)
      })
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
    let store: TStore

    beforeAll(() => {
      store = createStore()
    })

    describe('when no exercises are created', () => {
      it("doesn't set idle to false", () => {
        store.clearTimers()
        store.startExercise()
        expect(store.idle).toBe(false)
      })
    })

    describe('when exercises are created', () => {
      it('sets idle to true', () => {
        store.addExercise()
        store.startExercise()
        expect(store.idle).toBe(true)
      })
    })
  })

  describe('startExercise()', () => {
    let store: TStore

    describe('when no exercise is added', () => {
      beforeAll(() => {
        store = createStore()
        mocked(TimerWorker).mockClear()
        store.startExercise()
      })

      it('does not create a new TimerWorker', () => {
        expect(TimerWorker).toHaveBeenCalledTimes(0)
      })

      it('does not set the current round', () => {
        expect(store.current.round).toBeNull()
      })

      it('does not set the current exercise', () => {
        expect(store.current.exercise).toBeNull()
      })
    })

    describe('when at least one exercise is added', () => {
      beforeAll(() => {
        store = createStore()
        store.addExercise()
        mocked(TimerWorker).mockClear()
        store.startExercise()
      })

      it('creates a new TimerWorker', () => {
        expect(TimerWorker).toHaveBeenCalledTimes(1)
      })

      it('sets the current round', () => {
        expect(store.current.round).not.toBeNull()
      })

      it('sets the current exercise', () => {
        expect(store.current.exercise).not.toBeNull()
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
