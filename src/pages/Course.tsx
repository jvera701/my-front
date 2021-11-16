import React, { useState, useEffect } from 'react'
import CustomNavbar from '../components/CustomNavbar'
import CustomSidebar from '../components/CustomSidebar'
import Posts from '../components/Posts'
import '../assets/styles/CoursePage.css'
import customAxios from '../axios'
import Spinner from '../components/Spinner'
import { useSelector } from 'react-redux'

interface IName {
  name: string
}

interface ICourseSidebar {
  title: string
  score: number
  category: string
  createdAt: string
  replies: number
  _id: string
  userId: IName
}

export type TCourseSidebar = ICourseSidebar[]

export default function Course() {
  const [pinnedCourses, setPinnedCourses] = useState<TCourseSidebar>([])
  const [courses, setCourses] = useState<TCourseSidebar>([])
  const [search, setSearch] = useState('')
  const [loaded, setLoaded] = useState(false)
  const course = useSelector((state: any) => state.course)

  async function setData(customCourse) {
    setLoaded(false)
    const resp: any = await customAxios({
      url: customAxios.defaults.baseURL + '/' + customCourse,
      method: 'get',
    })
    setPinnedCourses(resp.data.pinned)
    setCourses(resp.data.notPinned)
    setLoaded(true)
  }

  useEffect(() => {
    setData(course)
  }, [])

  if (!loaded) return <Spinner />
  return (
    <>
      <CustomNavbar showFiles={true} />
      <div className='course-page'>
        <CustomSidebar
          setData={setData}
          courses={courses}
          setCourses={setCourses}
          setSearch={setSearch}
          search={search}
        />
        <Posts />
      </div>
    </>
  )
}
