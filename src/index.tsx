import * as Sentry from '@sentry/browser'
import 'mobx-react-lite/batchingForReactDom'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

Sentry.init({
  dsn:
    'https://21d638c5eda142e58407e366dd4d6684@o382969.ingest.sentry.io/5212603'
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.register({
  onUpdate: (registration) => {
    alert('New version available!  Ready to update?')
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
    window.location.reload()
  }
})
