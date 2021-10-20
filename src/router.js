import React from 'react'
import App from './App'
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const ReactRouter = () => {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/structures">
        <App />
      </Route>
    </Router>
  )
}

export default ReactRouter
