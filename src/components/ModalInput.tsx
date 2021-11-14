import React from 'react'
import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import customAxios from '../axios'
import { updatePost } from '../store/actionCreators'
import { useHistory } from 'react-router-dom'

export default function ModalInput(props) {
  const [input, setInput] = useState('')
  const { show, handleClose, isMain, id } = props

  const threadId = useSelector((state: any) => state.threadInformation.info._id)
  const email = useSelector((state: any) => state.user.email)
  const course = useSelector((state: any) => state.course)
  const dispatch = useDispatch()
  const history = useHistory()
  const [validated, setValidated] = useState(false)

  function updateSearch(e) {
    e.preventDefault()
    setInput(e.target.value)
  }

  async function submit(e) {
    e.preventDefault()

    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
    } else {
      if (isMain) {
        await customAxios({
          url: customAxios.defaults.baseURL + '/comment',
          method: 'post',
          data: {
            content: input,
            email: email,
            threadId: threadId,
            parentCommentId: '',
          },
        })
      } else {
        await customAxios({
          url: customAxios.defaults.baseURL + '/comment',
          method: 'post',
          data: {
            content: input,
            email: email,
            threadId: '',
            parentCommentId: id,
          },
        })
      }

      handleClose()
      dispatch(updatePost(threadId))
      history.push('/homes/' + course)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      {' '}
      <Form noValidate validated={validated} onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title>Enter comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control required onChange={updateSearch} />
          <Form.Control.Feedback type='invalid'>
            Please enter a comment
          </Form.Control.Feedback>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
