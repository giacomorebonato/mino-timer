import * as Sentry from '@sentry/browser'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

Sentry.init({
  dsn:
    'https://d8f8de1f8f464c7a8a10060bf7eca490@o382969.ingest.sentry.io/5212648'
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
