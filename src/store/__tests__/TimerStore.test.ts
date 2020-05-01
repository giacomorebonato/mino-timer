import { mocked } from 'ts-jest/utils'
import { TimerWorker } from '../../workers/timer-worker'
import { RootStore } from '../index'

jest.mock('../../workers/getTimerWorker', () => ({
  getTimerWorker: () => require('../../workers/timer-worker').TimerWorker
}))
jest.mock('../../workers/timer-worker', () => ({
  TimerWorker: jest.fn(() => ({
    clearInterval: async () => {},
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
  describe('startExercise()', () => {
    let store: RootStore
    beforeAll(() => {
      store = new RootStore()
    })
    beforeEach(async () => {
      await store.timer.stopPerformance()
    })
    describe('when no exercise is created', () => {
      it("doesn't set idle to true", async () => {
        store.timer.clearPerformance()
        store.timer.startExercise()

        expect(store.timer.idle).toBe(false)
      })
    })
    describe('when exercises are created', () => {
      it('sets idle to true', async () => {
        store.round.addExercise()
        store.timer.startExercise()
        expect(store.timer.idle).toBe(true)
      })
    })
    describe('when there is a round with no exercises', () => {
      it('sets idle to false', async () => {
        store.timer.clearPerformance()
        store.round.addExercise()
        store.round.rounds.get(1)!.exercises = []
        store.timer.startExercise()

        expect(store.timer.idle).toBe(false)
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
      afterAll(async () => {
        await store.timer.stopPerformance()
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
      afterAll(async () => {
        await store.timer.stopPerformance()
      })
      it('does not create a new TimerWorker', () => {
        expect(TimerWorker).not.toHaveBeenCalled()
      })
      it('sets the current round', () => {
        expect(store.round.current).not.toBeNull()
      })
      it('sets the current exercise', () => {
        expect(store.round.current.exercise).not.toBeNull()
      })
    })
  })
  describe('stopPerformance()', () => {
    let store: RootStore
    beforeAll(async () => {
      store = new RootStore()
      store.timer.startExercise()
    })
    it('sets idle to false', async () => {
      await store.timer.stopPerformance()
      expect(store.timer.idle).toBe(false)
    })
  })
})
