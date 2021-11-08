import React from 'react'
import '../assets/styles/Post.css'
import Button from 'react-bootstrap/Button'
import Latex from 'react-latex'
import { useSelector } from 'react-redux'
import { ArrowDownCircle, ArrowUpCircle, Person } from 'react-bootstrap-icons'

export default function Posts(props) {
  //const lat = `$\\int_{-\\infty}^\\infty x^{2}$`
  const { title, content, person, time, answers } = props
  const role = useSelector((state: any) => state.user.role)
  return (
    <div className='post'>
      <div className='post-title'>{title}</div>
      <div className='post-top'>
        <div className='post-answer'> {content}</div>
        <div className='post-vote'>
          <div className='post-inner-vote'>
            <ArrowUpCircle />
          </div>
          <div className='post-inner-vote'>
            <ArrowDownCircle />
          </div>
        </div>
      </div>
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
          {person}
        </div>
        <div className='post-info'>{time}</div>
      </div>
      <div className='post-answers'> {answers + ' Answers'} </div>
    </div>
  )
}
