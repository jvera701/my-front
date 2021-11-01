import reducer from './reducer'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { LOADING, INITIALIZED } from './actions'

const initialState = {
  user: {},
  status: LOADING,
  errStatus: INITIALIZED,
  error: '',
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default function createStoreApp() {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  )
}
