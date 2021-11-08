import React from 'react'
import { ArrowUpCircle, PinAngleFill, ChatFill } from 'react-bootstrap-icons'
import { Badge } from 'react-bootstrap'
import '../assets/styles/Course.css'

export default function CourseSidebar() {
  return (
    <div className='card-course'>
      <div className='title-course'>
        <div className='question-course'>
          sssssss ssss ssss aaaa aaaa cc yyy yyyy yyy dddd ddd ddd
        </div>
        <div className='right-course'>
          <PinAngleFill className='pin-course' />
          <span> &nbsp;</span>
          5 <ArrowUpCircle className='arrow-course' />
        </div>
      </div>
      <div className='bottom-course'>
        <div className='thread-category-course'>
          <Badge pill bg='green'>
            General
          </Badge>
        </div>
        <div>50m</div>
        <div>
          10 <ChatFill className='chat-course' />
        </div>
        <div className='name-course'> Jose Vera </div>
      </div>
    </div>
  )
}
