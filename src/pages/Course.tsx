import React from 'react'
import CustomNavbar from '../components/CustomNavbar'
import CustomSidebar from '../components/CustomSidebar'
import Posts from '../components/Posts'
import LeftSidebar from '../components/LeftSidebar'
import '../assets/styles/CoursePage.css'

export default function Course() {
  const obj = {
    title: 'How do you integrate by parts ?',
    content: 'ss',
    person: 'Jose Vera',
    time: 'Posted 5 minutes ago',
    answers: '0',
  }

  return (
    <>
      <CustomNavbar />
      <div className='course-page'>
        <LeftSidebar />
        <CustomSidebar />
        <Posts {...obj} />
      </div>
    </>
  )
}
