import React from 'react'
//import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { ArrowDownCircle, ArrowUpCircle, Person } from 'react-bootstrap-icons'
import '../assets/styles/Post.css'

export default function CommentPost(props) {
  const { content, userId, score, createdAt } = props
  return (
    <>
      <div className='post-comment-top'>
        <div className='post-comment-answer'> {content} </div>
      </div>
      <div className='post-comment-bottom'>
        <Button variant='post' size='sm' type='submit'>
          Delete
        </Button>
        <Button variant='post' size='sm' type='submit'>
          Edit
        </Button>
        <div className='post-person'>
          <Person />
          {userId.name}
        </div>
        <div className='post-time'>{createdAt}</div>
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
    </>
  )
}
