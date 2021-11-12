import React from 'react'
import {
  ArrowUpCircle,
  PinAngleFill,
  ChatFill,
  Person,
} from 'react-bootstrap-icons'
import { Badge } from 'react-bootstrap'
import { updatePost } from '../store/actionCreators'
import '../assets/styles/Course.css'
import { useDispatch } from 'react-redux'

export default function ThreadSidebar(props) {
  const { title, score, category, time, replies, name, pinned, _id } = props
  const dispatch = useDispatch()

  let pillCategory = 'red'
  if (category === 'General') pillCategory = 'blue'
  else if (category === 'Lectures') pillCategory = 'green'

  return (
    <div
      className='card-course'
      onClick={() => {
        dispatch(updatePost(_id))
      }}
    >
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
          <Badge pill bg={pillCategory}>
            {category}
          </Badge>
        </div>
        <div>{time}</div>
        <div>
          {replies} <ChatFill className='chat-course' />
        </div>
        <div className='name-course'>
          <Person /> {name}{' '}
        </div>
      </div>
    </div>
  )
}
