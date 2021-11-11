import React from 'react'
import { Button } from 'react-bootstrap'
import { PencilSquare } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import '../assets/styles/LeftSidebar.css'

export default function LeftSidebar() {
  const course = useSelector((state: any) => state.course)
  const history = useHistory()
  return (
    <div className='left-sidebar'>
      <Button
        variant='post'
        size='sm'
        onClick={() => history.push('/home/' + course + '/createThread')}
      >
        <PencilSquare /> New Thread
      </Button>
      <div className='title-left-sidebar'> Courses</div>
      <div className='courses-left-sidebar'>
        <div>Math </div>
        <div>Comp </div>
        <div>Comp123 </div>
      </div>
      <div className='title-left-sidebar'>Categories</div>
      <div>
        <div className='category-left-sidebar'>
          <div className='square general'> </div>
          General
        </div>
        <div className='category-left-sidebar'>
          <div className='square lectures'> </div>
          Lectures
        </div>
        <div className='category-left-sidebar'>
          <div className='square quizzes'> </div>
          Quizzes
        </div>
      </div>
    </div>
  )
}
