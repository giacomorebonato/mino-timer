// eslint-disable-next-line import/no-webpack-loader-syntax
import MyWorker from 'comlink-loader!./timer-worker'

export const getTimerWorker = () => {
  const inst = new MyWorker()

  return inst.TimerWorker
}
