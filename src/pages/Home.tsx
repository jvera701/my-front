import '../assets/styles/home.css'
import CustomNavbar from '../components/CustomNavbar'
import React, { useEffect, useState } from 'react'
import customAxios from '../axios'
import { useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { putCourse } from '../store/actionCreators'
interface Course {
  code: string
  period: number
  name: string
  _id: string
  files: [string]
}

export type TCourseList = [Course[]]

export default function Home() {
  const email = useSelector((state: any) => state.user.email)
  const [courseData, setCourseData] = useState<TCourseList>([[]])
  const dispatch = useDispatch()

  async function setData() {
    const resp: any = await customAxios({
      url: customAxios.defaults.baseURL + '/home',
      method: 'post',
      data: {
        email: email,
      },
    })
    setCourseData(resp.data)
  }

  useEffect(() => {
    setData()
  }, [])

  if (courseData.length === 1) return <Spinner />
  else {
    return (
      <>
        <CustomNavbar />
        {courseData.map((courses: Course[]) => {
          return (
            <>
              <h3 className='subtitle-home'>
                {' '}
                {'Period ' + courses[0].period}
              </h3>
              <div key={courses[0].period} className='div-home'>
                {courses.map((course: Course) => {
                  const strLink = '/home/' + course._id
                  return (
                    <Link
                      to={strLink}
                      key={course._id}
                      className='link-home'
                      onClick={() => {
                        dispatch(putCourse(course._id))
                      }}
                    >
                      <div key={course._id} className='card-style-home'>
                        <div className='title-card-home'>{course.code}</div>
                        <div className='text-card-home'>{course.name}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </>
          )
        })}
      </>
    )
  }
}
