import React from 'react'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { ArrowDownCircle, ArrowUpCircle, Person } from 'react-bootstrap-icons'
import '../assets/styles/Post.css'
import CommentPost from './CommentPost'
import { useState } from 'react'
import ModalInput from './ModalInput'
import { msToTime } from './Posts'

export default function MainPost(props) {
  const { title, content, userId, score, createdAt, replies, comments, id } =
    props
  const { role, email } = useSelector((state: any) => state.user)
  const commentsExists = !!props.comments
  const emailPost = userId.email
  const showButton = role === 'admin' || email === emailPost

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      {title !== '' ? <div className='post-title'>{title}</div> : ''}
      <div className='post-answer'> {content}</div>
      <div className='post-bottom'>
        <Button variant='post' size='sm' type='submit' onClick={handleShow}>
          Reply
        </Button>

        {showButton ? (
          <>
            <Button variant='post' size='sm' type='submit'>
              Delete
            </Button>
            <Button variant='post' size='sm' type='submit'>
              Edit
            </Button>{' '}
          </>
        ) : (
          ''
        )}
        {role === 'admin' ? (
          <Button variant='post' size='sm' type='submit'>
            Pin
          </Button>
        ) : (
          ''
        )}
        <div className='post-person'>
          <Person />
          {userId.name}
        </div>
        <div className='post-time'>{msToTime(createdAt)}</div>
        <div className='post-vote'>
          <div> {score} &nbsp;</div>
          <div className='post-inner-vote'>
            <ArrowUpCircle />
          </div>
          <div> &nbsp; </div>
          <div className='post-inner-vote'>
            <ArrowDownCircle />
          </div>
        </div>
      </div>
      {title !== '' ? (
        <div className='post-answers'> {replies + ' Answers'} </div>
      ) : (
        ''
      )}
      {commentsExists
        ? comments.map(comment => {
            return <CommentPost {...comment} key={comment._id} id={id} />
          })
        : ''}
      {title !== '' ? (
        <ModalInput
          show={show}
          handleClose={handleClose}
          isMain={true}
          id={''}
        />
      ) : (
        <ModalInput
          show={show}
          handleClose={handleClose}
          isMain={false}
          id={id}
        />
      )}
    </>
  )
}
