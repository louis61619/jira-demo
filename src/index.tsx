import './wdyr'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppProviders } from './context'
import './assets/index.less'
import { ReactQueryDevtools } from 'react-query/devtools'

const { startServer } = require('../mock')
startServer()

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
)
