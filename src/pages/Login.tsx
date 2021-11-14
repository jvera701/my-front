import React from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../assets/styles/login.css'
import { useState, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { loginAxios } from '../store/actionCreators'
import { AUTHORIZATION } from '../store/actions'
import { loadUser, logOut } from '../store/actionCreators'
import { useEffect } from 'react'

export default function Login() {
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
  const [invalidLogin, setInvalidLogin] = useState(false)
  const [validated, setValidated] = useState(false)

  function updateLogin(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setEmail(e.target.value)
  }

  function updatePassword(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
    setInvalidLogin(false)
    if (email !== '' && password !== '')
      dispatch(loginAxios(email, password, setInvalidLogin))
  }

  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1 className='title-login'> Welcome to ed </h1>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label column='lg' className='login-text'>
            {' '}
            Email{' '}
          </Form.Label>
          <Form.Control
            required
            className='login-form'
            onChange={updateLogin}
          />
          <Form.Control.Feedback type='invalid'>
            Please enter an email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label column='lg' className='login-text'>
            Password
          </Form.Label>
          <Form.Control required type='password' onChange={updatePassword} />
          <Form.Control.Feedback type='invalid'>
            Please enter a password
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant='login-btn' size='lg' type='submit'>
          Login
        </Button>{' '}
        <Button variant='login-btn' size='lg'>
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
