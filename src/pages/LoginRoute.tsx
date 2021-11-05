import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { AUTHENTICATED } from '../store/actions'

export default function LoginRoute({ component: Component, ...rest }) {
  const status = useSelector((state: any) => state.status)
  return (
    <Route
      {...rest}
      render={props =>
        status === AUTHENTICATED ? (
          <Redirect to='/home' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}
