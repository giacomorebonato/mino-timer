import { wrap } from 'comlink'
import { TimerWorkerType } from './timer-worker'

export const getTimerWorker = () => {
  const worker = new Worker('./timer-worker', {
    name: 'timer-worker',
    type: 'module'
  })

  return wrap<TimerWorkerType>(worker)
}
