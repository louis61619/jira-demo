import './wdyr'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppProviders } from './context'
import './assets/index.less'

const { startServer } = require('../mock')
startServer()

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
)
