import React from 'react'
import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import customAxios from '../axios'
import { updatePost } from '../store/actionCreators'

export default function ModalInput(props) {
  const [input, setInput] = useState('')
  const { show, handleClose, isMain, id } = props

  const threadId = useSelector((state: any) => state.threadInformation.info._id)
  const email = useSelector((state: any) => state.user.email)
  const dispatch = useDispatch()

  function updateSearch(e) {
    e.preventDefault()
    setInput(e.target.value)
  }

  async function submit() {
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
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      {' '}
      <Modal.Header closeButton>
        <Modal.Title>Enter comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control onChange={e => updateSearch(e)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={submit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
