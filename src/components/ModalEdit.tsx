import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import customAxios from '../axios'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearThread, updatePost } from '../store/actionCreators'

export default function ModalEdit(props) {
  const { show, handleClose, isMain, commentId, content } = props
  const threadId = useSelector((state: any) => state.threadInformation.info._id)
  const threadTitle = useSelector(
    (state: any) => state.threadInformation.info.title
  )
  const threadContent = useSelector(
    (state: any) => state.threadInformation.info.content
  )
  const course = useSelector((state: any) => state.course)

  const [titles, setTitles] = useState(threadTitle)
  const contentState = isMain ? threadContent : content
  const [contents, setContents] = useState(contentState)
  const [validated, setValidated] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  function updateComment(e) {
    e.preventDefault()
    setContents(e.target.value)
  }

  function updateTitle(e) {
    e.preventDefault()
    setTitles(e.target.value)
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
          url: customAxios.defaults.baseURL + '/thread',
          method: 'put',
          data: {
            _id: threadId,
            title: titles,
            content: contents,
          },
        })
      } else {
        //const toPut = commentId !== '' ? commentId : id
        await customAxios({
          url: customAxios.defaults.baseURL + '/comment',
          method: 'put',
          data: {
            content: contents,
            _id: commentId,
          },
        })
      }

      handleClose()
      dispatch(clearThread())
      dispatch(updatePost(threadId))
      history.push('/homes/' + course)
    }
  }

  if (isMain) {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        {' '}
        <Form noValidate validated={validated} onSubmit={submit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit your thread</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Edit your title </Form.Label>
              <Form.Control
                required
                onChange={e => updateTitle(e)}
                value={titles}
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a title
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Edit your comment </Form.Label>
              <Form.Control
                required
                onChange={e => updateComment(e)}
                value={contents}
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a comment
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  } else {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        {' '}
        <Form noValidate validated={validated} onSubmit={submit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit your comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              required
              onChange={e => updateComment(e)}
              value={contents}
            />
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
}
