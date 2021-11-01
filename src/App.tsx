import Login from './pages/Login'
import Home from './pages/Home'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AUTHORIZATION } from './store/actions'
import { loadUser, logOut } from './store/actionCreators'
import { Suspense, useEffect } from 'react'
import Loading from './components/Loading'
import React from 'react'
import NotFound from './pages/NotFound'
import history from './history'
import PrivateRoute from './pages/PrivateRoute'
import LoginRoute from './pages/LoginRoute'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem(AUTHORIZATION)) {
      dispatch(loadUser())
    } else {
      dispatch(logOut())
    }
  }, [dispatch])

  return (
    <Router history={history}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <LoginRoute exact path='/' component={Login} />
          <PrivateRoute exact path='/home' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
