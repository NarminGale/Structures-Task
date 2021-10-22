import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import ReactRouter from './router'

ReactDOM.render(
  <React.StrictMode>
    <ReactRouter />
  </React.StrictMode>,
  document.getElementById('app')
)
