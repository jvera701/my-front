import React from 'react'
import CustomNavbar from '../components/CustomNavbar'
import CustomSidebar from '../components/CustomSidebar'
import Posts from '../components/Posts'
import '../assets/styles/CoursePage.css'

export default function Course() {
  return (
    <>
      <CustomNavbar showFiles={true} />
      <div className='course-page'>
        <CustomSidebar />
        <Posts />
      </div>
    </>
  )
}
