import React from 'react'
import '../assets/styles/Post.css'
import Button from 'react-bootstrap/Button'
import Latex from 'react-latex'
import { ArrowDownCircle, ArrowUpCircle, Person } from 'react-bootstrap-icons'

export default function Posts() {
  //const lat = `$\\int_{-\\infty}^\\infty x^{2}$`
  return (
    <div className='post'>
      <div className='post-title'> How do you integrate by parts ? </div>
      <div className='post-top'>
        <div className='post-answer'> ss</div>
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
        <Button variant='post' size='sm' type='submit'>
          Pin
        </Button>
        <div className='post-person'>
          <Person />
          Jose Vera
        </div>
        <div className='post-info'>Posted 55 minutes ago</div>
      </div>
      <div className='post-answers'> 0 Answers </div>
    </div>
  )
}
