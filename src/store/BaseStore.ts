import debug from 'debug'
import type { RootStore } from './index'

export abstract class BaseStore {
  root: RootStore
  log: debug.Debugger

  DEFAULT_EXERCISE_TIME = 30
  DEFAULT_RECOVERY_TIME = 15

  constructor(rootStore: RootStore) {
    this.root = rootStore
    this.log = debug(this.constructor.name)
  }
}
