import customAxios from '../axios'
import { AUTHORIZATION, LOGIN, ERROR, LOGOUT } from './actions'
import history from '../history'
import { Dispatch } from 'react'

export function loginAxios(
  email: string,
  password: string,
  setInvalidLogin: React.Dispatch<React.SetStateAction<boolean>>
) {
  return async function (dispatch: Dispatch<any>) {
    try {
      const response: any = await customAxios({
        url: customAxios.defaults.baseURL + '/login',
        method: 'post',
        data: {
          email: email,
          password: password,
        },
      })
      localStorage.setItem(AUTHORIZATION, response.data.token)
      customAxios.defaults.headers.common['Authorization'] = response.data.token
      dispatch({ type: LOGIN, payload: response.data })
      history.push('/home')
    } catch (e) {
      setInvalidLogin(true)
    }
  }
}

export function loadUser() {
  return async function (dispatch: Dispatch<any>) {
    try {
      const auth: string | null = localStorage.getItem(AUTHORIZATION)
      if (auth !== null) {
        customAxios.defaults.headers.common['Authorization'] = auth
        const response = await customAxios.get('/me')
        dispatch({ type: LOGIN, payload: response.data })
        history.push('/home')
      }
    } catch (e: any) {
      localStorage.removeItem(AUTHORIZATION)
      dispatch({ type: ERROR, payload: e.response.data.error })
    }
  }
}

export function logOut() {
  return async function (dispatch: Dispatch<any>) {
    localStorage.removeItem(AUTHORIZATION)
    history.push('/')
    return { type: LOGOUT }
  }
}
