import {
  LOGIN,
  AUTHENTICATED,
  ERROR,
  FINISHED,
  LOGOUT,
  NOT_AUTHENTICATED,
  COURSE,
  UPDATE_THREAD,
} from './actions'

function reducer(state: any, action: any) {
  switch (action.type) {
    case LOGIN: {
      const { name, role, email } = action.payload
      return {
        ...state,
        user: { name, role, email },
        status: AUTHENTICATED,
        error: '',
      }
    }
    case COURSE: {
      const { courseId } = action.payload
      return {
        ...state,
        course: courseId,
      }
    }
    case ERROR:
      return {
        ...state,
        error: action.payload,
        errStatus: FINISHED,
      }
    case LOGOUT:
      return {
        ...state,
        user: {},
        status: NOT_AUTHENTICATED,
        error: '',
      }
    case UPDATE_THREAD:
      return {
        ...state,
        threadInformation: action.payload,
      }
    default:
      return state
  }
}

export default reducer
