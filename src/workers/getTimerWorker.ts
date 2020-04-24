// eslint-disable-next-line import/no-webpack-loader-syntax
import MyWorker from 'comlink-loader!./timer-worker'
import type { TimerWorker } from './timer-worker'

export const getTimerWorker = () => {
  const inst = new MyWorker()

  return inst.TimerWorker as typeof TimerWorker
}
