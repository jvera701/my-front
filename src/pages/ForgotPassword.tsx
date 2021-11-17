import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import customAxios from '../axios'
import { useDispatch } from 'react-redux'
import { loginAxios } from '../store/actionCreators'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showToken, setShowToken] = useState(false)
  const [token, setToken] = useState('')
  const [validated, setValidated] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  function updateMail(e) {
    e.preventDefault()
    setEmail(e.target.value)
  }
  function updatePassword(e) {
    e.preventDefault()
    setPassword(e.target.value)
  }

  function updateToken(e) {
    e.preventDefault()
    setToken(e.target.value)
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function handleRequest() {
    if (email !== '') {
      await customAxios({
        url: customAxios.defaults.baseURL + '/request-reset',
        method: 'post',
        data: {
          email: email,
        },
      })
      setShowToken(true)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (email !== '' && password !== '' && token !== '') {
      try {
        await customAxios({
          url: customAxios.defaults.baseURL + '/password-reset',
          method: 'post',
          data: {
            email: email,
            token: token,
            password: password,
          },
        })
        await sleep(500)
        dispatch(loginAxios(email, password, setValidated))
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <>
      <h1 className='title-forgot-password'> Change your password </h1>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label column='lg' className='login-text'>
              Email
            </Form.Label>
            <Form.Control required onChange={updateMail} />
            <Form.Control.Feedback type='invalid'>
              Please enter an email
            </Form.Control.Feedback>
          </Form.Group>
          {!showToken ? (
            <>
              <Button variant='login-btn' size='lg' onClick={handleRequest}>
                Request change
              </Button>{' '}
              <Button
                variant='login-btn'
                size='lg'
                onClick={() => {
                  history.push('/')
                }}
              >
                Go back
              </Button>
            </>
          ) : (
            ''
          )}
          {showToken ? (
            <>
              <div className='alert alert-primary mt-2'>
                An email has been send with a token, please submit it here
              </div>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label column='lg' className='login-text'>
                  New Password
                </Form.Label>
                <Form.Control
                  required
                  type='password'
                  onChange={updatePassword}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter a new password
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label column='lg'>Token</Form.Label>
                <Form.Control required onChange={updateToken} />
                <Form.Control.Feedback type='invalid'>
                  Please enter a token
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant='login-btn' size='lg' type='submit'>
                Submit
              </Button>{' '}
              <Button
                variant='login-btn'
                size='lg'
                onClick={() => {
                  history.push('/')
                }}
              >
                Go back
              </Button>
            </>
          ) : (
            ''
          )}
        </Form>
      </Container>
    </>
  )
}
