// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

jest.mock('comlink')
jest.mock('./workers/getTimerWorker', () => ({
  getTimerWorker: async () =>
    (await import('./workers/timer-worker')).TimerWorker
}))
