import Login from "./pages/Login"
import Home from "./pages/Home"
import { Router, Switch, Route } from "react-router-dom"

import { Suspense, lazy } from "react"
import Loading from "./components/Loading"
import { createBrowserHistory } from "history"
const history = createBrowserHistory()


function App() {
  return (
    <Router history={history}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
