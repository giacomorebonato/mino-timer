import { mocked } from 'ts-jest/utils'
import { TimerWorker } from '../../workers/timer-worker'
import { RootStore } from '../index'

jest.mock('../../workers/getTimerWorker', () => ({
  getTimerWorker: () => require('../../workers/timer-worker').TimerWorker
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

describe('Timer', () => {
  describe('startTimer()', () => {
    let store: RootStore
    beforeAll(() => {
      store = new RootStore()
    })
    describe('when no exercises are created', () => {
      it("doesn't set idle to false", () => {
        store.timer.clearPerformance()
        store.timer.startExercise()
        expect(store.timer.idle).toBe(false)
      })
    })
    describe('when exercises are created', () => {
      it('sets idle to true', () => {
        store.round.addExercise()
        store.timer.startExercise()
        expect(store.timer.idle).toBe(true)
      })
    })
  })
  describe('startExercise()', () => {
    let store: RootStore
    describe('when no exercise is added', () => {
      beforeAll(() => {
        store = new RootStore()
        mocked(TimerWorker).mockClear()
        store.round.rounds.clear()
        store.timer.startExercise()
      })
      it('does not create a new TimerWorker', () => {
        expect(TimerWorker).toHaveBeenCalledTimes(0)
      })
      it('does not set the current round', () => {
        expect(store.round.current.round).toBeNull()
      })
      it('does not set the current exercise', () => {
        expect(store.round.current.exercise).toBeNull()
      })
    })
    describe('when at least one exercise is added', () => {
      beforeAll(() => {
        store = new RootStore()
        store.round.addExercise()
        mocked(TimerWorker).mockClear()
        store.timer.startExercise()
      })
      it('creates a new TimerWorker', () => {
        expect(TimerWorker).toHaveBeenCalledTimes(1)
      })
      it('sets the current round', () => {
        expect(store.round.current).not.toBeNull()
      })
      it('sets the current exercise', () => {
        expect(store.round.current.exercise).not.toBeNull()
      })
    })
  })
  describe('stopTimers()', () => {
    let store: RootStore
    beforeAll(() => {
      store = new RootStore()
      store.timer.startExercise()
      store.timer.stopPerformance()
    })
    it('sets idle to false', () => {
      expect(store.timer.idle).toBe(false)
    })
  })
})
