import Login from './pages/Login'
import Home from './pages/Home'
import { Router, Switch, Route } from 'react-router-dom'

import { Suspense, lazy } from 'react'
import Loading from './components/Loading'
import React from 'react'
import NotFound from './pages/NotFound'
import history from './history'

function App() {
  return (
    <Router history={history}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
