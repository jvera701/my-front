import React from 'react'
import CourseSidebar from './CourseSidebar'
import Form from 'react-bootstrap/Form'
import '../assets/styles/Course.css'
import { InputGroup } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'

function msToTime(ms) {
  const seconds = ms / 1000
  const minutes = ms / (1000 * 60)
  const hours = ms / (1000 * 60 * 60)
  const days = ms / (1000 * 60 * 60 * 24)
  if (seconds < 60) return seconds.toFixed(1) + ' s'
  else if (minutes < 60) return minutes.toFixed(1) + ' m'
  else if (hours < 24) return hours.toFixed(1) + ' h'
  else return days.toFixed(1) + ' d'
}

const CustomSidebar = () => {
  const obj = {
    title: 'title',
    score: '0',
    category: 'General',
    time: '5m',
    replies: '6',
    name: 'Jose',
    pinned: false,
  }

  return (
    <div className='sidebar'>
      <InputGroup>
        <InputGroup.Text>
          <Search />
        </InputGroup.Text>
        <Form.Control placeholder='Search' />
      </InputGroup>
      <CourseSidebar {...obj} />
    </div>
  )
}

export default CustomSidebar
