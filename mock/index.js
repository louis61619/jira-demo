import { setupWorker } from 'msw'
import { handlers } from './handlers'

const url = process.env.NODE_ENV === 'production' ? '/mockServiceWorker.js' : '/jira-demo/mockServiceWorker.js'

export const startServer = () => {
  const server = setupWorker(...handlers)
  server.start({
    quiet: true,
    serviceWorker: {
      url
    }
  })
}