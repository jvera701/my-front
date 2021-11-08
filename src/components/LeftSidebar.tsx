import React from 'react'
import { Button } from 'react-bootstrap'
import { PencilSquare } from 'react-bootstrap-icons'
import '../assets/styles/LeftSidebar.css'

export default function LeftSidebar() {
  return (
    <div className='left-sidebar'>
      <Button variant='post' size='sm'>
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
          <div className='square tutorials'> </div>
          Tutorials
        </div>
        <div className='category-left-sidebar'>
          <div className='square quizzes'> </div>
          Quizzes
        </div>
        <div className='category-left-sidebar'>
          <div className='square assignments'> </div>
          Assignments
        </div>
        <div className='category-left-sidebar'>
          <div className='square exams'> </div>
          Exams
        </div>
        <div className='category-left-sidebar'>
          <div className='square resources'> </div>
          Resources
        </div>
      </div>
    </div>
  )
}
