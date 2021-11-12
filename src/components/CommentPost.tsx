import React from 'react'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { ArrowDownCircle, ArrowUpCircle, Person } from 'react-bootstrap-icons'
import '../assets/styles/Post.css'
import { msToTime } from './Posts'
import { useState } from 'react'
import ModalEdit from './ModalEdit'

export default function CommentPost(props) {
  const { content, userId, score, createdAt, commentId } = props

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { role, email } = useSelector((state: any) => state.user)
  const emailPost = userId.email
  const showButton = role === 'admin' || email === emailPost
  return (
    <>
      <div className='post-comment-top'>
        <div className='post-comment-answer'> {content} </div>
      </div>
      <div className='post-comment-bottom'>
        {showButton ? (
          <>
            <Button variant='post' size='sm' type='submit'>
              Delete
            </Button>
            <Button variant='post' size='sm' type='submit' onClick={handleShow}>
              Edit
            </Button>
          </>
        ) : (
          <Button variant='post-invisible' size='sm' type='submit'>
            Lol
          </Button>
        )}
        <div className='post-person'>
          <Person />
          {userId.name}
        </div>
        <div className='post-time'>{msToTime(createdAt)}</div>
        <div className='post-vote'>
          <div> {score} &nbsp; </div>
          <div className='post-vote-comment'>
            <ArrowUpCircle />
          </div>
          <div> &nbsp; </div>
          <div className='post-vote-comment'>
            <ArrowDownCircle />
          </div>
        </div>
      </div>
      <ModalEdit
        show={show}
        handleClose={handleClose}
        isMain={false}
        commentId={commentId}
        content={content}
      />
    </>
  )
}
