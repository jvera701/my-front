import React from 'react'
import CustomNavbar from '../components/CustomNavbar'
import CustomSidebar from '../components/CustomSidebar'
import Posts from '../components/Posts'
import LeftSidebar from '../components/LeftSidebar'
import '../assets/styles/CoursePage.css'

export default function Course() {
  return (
    <>
      <CustomNavbar />
      <div className='course-page'>
        <LeftSidebar />
        <CustomSidebar />
        <Posts />
      </div>
    </>
  )
}
