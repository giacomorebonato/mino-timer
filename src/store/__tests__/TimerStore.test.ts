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
        triggerAttackRelease: jest.fn()
      }
    }
  }
}))

describe('Timer', () => {
  jest.useFakeTimers()

  describe('stopPerformance()', () => {
    let store: RootStore
    beforeAll(async () => {
      store = new RootStore()
      await store.timer.initWorker()
      store.timer.startPerformance()
    })
    it('sets idle to false', async () => {
      await store.timer.stopPerformance()
      expect(store.timer.idle).toBe(false)
    })
  })
})
