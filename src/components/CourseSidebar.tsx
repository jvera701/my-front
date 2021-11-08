import React from 'react'
import { ArrowUpCircle, PinAngleFill, ChatFill } from 'react-bootstrap-icons'
import { Badge } from 'react-bootstrap'
import '../assets/styles/Course.css'

export default function CourseSidebar(props) {
  const { title, score, category, time, replies, name, pinned } = props
  return (
    <div className='card-course'>
      <div className='title-course'>
        <div className='question-course'>{title}</div>
        <div className='right-course'>
          {pinned ? <PinAngleFill className='pin-course' /> : ''}
          <span> &nbsp;</span>
          {score} <ArrowUpCircle className='arrow-course' />
        </div>
      </div>
      <div className='bottom-course'>
        <div className='thread-category-course'>
          <Badge pill bg='green'>
            {category}
          </Badge>
        </div>
        <div>{time}</div>
        <div>
          {replies} <ChatFill className='chat-course' />
        </div>
        <div className='name-course'> {name} </div>
      </div>
    </div>
  )
}
