import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../assets/styles/login.css'
import { useState, MouseEvent, ChangeEvent } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { loginAxios } from '../store/actionCreators'
import { Link } from 'react-router-dom'
import { AUTHORIZATION } from '../store/actions'
import { loadUser, logOut } from '../store/actionCreators'
import { useEffect } from 'react'

function Login() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem(AUTHORIZATION)) {
      dispatch(loadUser())
    } else {
      dispatch(logOut())
    }
  }, [dispatch])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [invalidLogin, setInvalidLogin] = useState(false)

  function updateLogin(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setEmail(e.target.value)
  }

  function updatePassword(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setPassword(e.target.value)
  }

  function login(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setInvalidLogin(false)
    email === '' ? setLoginError(true) : setLoginError(false)
    password === '' ? setPasswordError(true) : setPasswordError(false)
    if (email !== '' && password !== '')
      dispatch(loginAxios(email, password, setInvalidLogin))
  }

  return (
    <Container>
      <Form>
        <h1 className='title-login'> Welcome to Educas </h1>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label column='lg' className='login-text'>
            {' '}
            Email{' '}
          </Form.Label>
          <Form.Control className='login-form' onChange={updateLogin} />
          {loginError ? (
            <div className='alert alert-danger mt-2'>
              email is a required field.
            </div>
          ) : (
            ''
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label column='lg' className='login-text'>
            Password
          </Form.Label>
          <Form.Control type='password' onChange={updatePassword} />
          {passwordError ? (
            <div className='alert alert-danger mt-2'>
              Password is a required field.
            </div>
          ) : (
            ''
          )}
        </Form.Group>
        <Link to='/home'>
          <Button variant='login-btn' size='lg' type='submit' onClick={login}>
            Login
          </Button>
        </Link>{' '}
        <Button variant='login-btn' size='lg' type='submit'>
          Forgot password
        </Button>
        {invalidLogin ? (
          <div className='alert alert-danger mt-2'>
            Invalid login, please try again
          </div>
        ) : (
          ''
        )}
      </Form>
    </Container>
  )
}

export default Login
