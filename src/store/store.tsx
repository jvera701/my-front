import reducer from './reducer'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { LOADING, INITIALIZED } from './actions'

const initialState = {
  user: {},
  status: LOADING,
  errStatus: INITIALIZED,
  error: '',
  course: '',
  threadInformation: {
    info: {
      title: 'Welcome',
      content: 'Hello, welcome to the course advanced calculus',
      isEdited: false,
      score: 0,
      photos: [''],
      userId: {
        name: 'Leo',
      },
      createdAt: '2020',
      replies: 2,
    },
    comments: [
      {
        _id: '618960d259edf1fa65673829',
        isEdited: false,
        score: 2,
        photos: [''],
        threadId: '61814d3119acb9588fdff83b',
        content: 'hello world !!!',
        userId: {
          name: 'Leo',
        },
        comments: [
          {
            comments: [],
            _id: '618ad1532042b89f42a6cbb5',
            isEdited: false,
            score: 0,
            photos: [''],
            threadId: null,
            content: 'I have no idea',
            userId: {
              name: 'Leo',
            },
            createdAt: '2021-11',
          },
        ],
        createdAt: '2021',
      },
      {
        _id: '6189629e59edf1fa65673834',
        isEdited: false,
        score: -4,
        photos: [''],
        threadId: '61814d3119acb9588fdff83b',
        content: 'I have no idea',
        userId: {
          name: 'Leo',
        },
        comments: [],
        createdAt: '2021-11-09s',
      },
    ],
  },
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
