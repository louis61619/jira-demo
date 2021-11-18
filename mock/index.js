import { setupWorker } from 'msw'

import { handlers } from './handlers'

// const url =
//   process.env.NODE_ENV === 'production'
//     ? '/mockServiceWorker.js'
//     : '/jira-demo/mockServiceWorker.js'

// export const handlers = [
//   // Handles a POST /login request
//   // rest.post('/login', null),
//   // Handles a GET /user request
//   rest.post(`http://192.168.50.181:3000/jira-demo/login`, async (req, res, ctx) => {
//     // const { username, password } = req.body
//     const user = { name: 'fkewifjwo', password: 'fjweiofjwio' }
//     return res(ctx.json({ user }))
//   })
// ]

export const startServer = () => {
  const server = setupWorker(...handlers)
  server.start({
    quiet: true,
    serviceWorker: {
      url: '/mockServiceWorker.js',
      scope: '/'
    }
  })
}
