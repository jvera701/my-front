import Login from './pages/Login'
import Home from './pages/Home'
import { Router, Switch, Route } from 'react-router-dom'
import { Suspense } from 'react'
import React from 'react'
import NotFound from './pages/NotFound'
import history from './history'
import PrivateRoute from './pages/PrivateRoute'
import LoginRoute from './pages/LoginRoute'
import Spinner from './components/Spinner'
import Course from './pages/Course'

function App() {
  return (
    <Router history={history}>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <LoginRoute exact path='/' component={Login} />
          <PrivateRoute exact path='/home' component={Home} />
          <PrivateRoute exact path='/home/:id' component={Course} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
