import React from 'react'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { ArrowDownCircle, ArrowUpCircle, Person } from 'react-bootstrap-icons'
import '../assets/styles/Post.css'
import CommentPost from './CommentPost'

export default function MainPost(props) {
  const { title, content, userId, score, createdAt, replies, comments } = props
  const role = useSelector((state: any) => state.user.role)
  const commentsExists = !!props.comments

  return (
    <>
      {title !== '' ? <div className='post-title'>{title}</div> : ''}
      <div className='post-answer'> {content}</div>
      <div className='post-bottom'>
        <Button variant='post' size='sm' type='submit'>
          Reply
        </Button>
        <Button variant='post' size='sm' type='submit'>
          Delete
        </Button>
        <Button variant='post' size='sm' type='submit'>
          Edit
        </Button>
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
        <div className='post-time'>{createdAt}</div>
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
            return <CommentPost {...comment} key={comment._id} />
          })
        : ''}
    </>
  )
}
