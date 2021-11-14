import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import customAxios from '../axios'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearThread, updatePost } from '../store/actionCreators'

export default function AlertDelete(props) {
  const { show, handleClose, commentId, isMain } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const threadId = useSelector((state: any) => state.threadInformation.info._id)
  const course = useSelector((state: any) => state.course)

  async function deleteComment() {
    if (isMain) {
      await customAxios({
        url: customAxios.defaults.baseURL + '/thread',
        method: 'delete',
        data: {
          _id: threadId,
        },
      })
      handleClose()
      dispatch(clearThread())
      history.push('/homes/' + course)
    } else {
      await customAxios({
        url: customAxios.defaults.baseURL + '/comment',
        method: 'delete',
        data: {
          _id: commentId,
          threadId: threadId,
        },
      })
      handleClose()
      dispatch(clearThread())
      dispatch(updatePost(threadId))
      history.push('/homes/' + course)
    }
  }

  return (
    <>
      <Alert show={show} variant={'danger'}>
        <Alert.Heading>
          Are you sure you want to delete your comment ?
        </Alert.Heading>
        <Button onClick={deleteComment}>Ok</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </Alert>
    </>
  )
}
