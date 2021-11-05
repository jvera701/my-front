import React from 'react'
import CourseSidebar from './CourseSidebar'
import Form from 'react-bootstrap/Form'
import '../assets/styles/Course.css'

const CustomSidebar = () => {
  return (
    <div className='sidebar'>
      <Form.Control />
      <CourseSidebar />
      <CourseSidebar />
      <CourseSidebar />
      <CourseSidebar />
      <CourseSidebar />
      <CourseSidebar />
    </div>
  )
}

export default CustomSidebar
