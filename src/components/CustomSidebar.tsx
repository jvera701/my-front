import React from 'react'
import CourseSidebar from './CourseSidebar'
import Form from 'react-bootstrap/Form'
import '../assets/styles/Course.css'
import { InputGroup } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'

const CustomSidebar = () => {
  return (
    <div className='sidebar'>
      <InputGroup>
        <InputGroup.Text>
          <Search />
        </InputGroup.Text>
        <Form.Control placeholder='Search' />
      </InputGroup>
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
