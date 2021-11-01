import { CardGroup } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import '../assets/styles/home.css'
import CustomNavbar from '../components/CustomNavbar'
import React, { useEffect, useState } from 'react'
import customAxios from '../axios'
import { useSelector } from 'react-redux'

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

  function getData() {
    customAxios({
      url: customAxios.defaults.baseURL + '/home',
      method: 'post',
      data: {
        email: email,
      },
    })
      .then((response: any) => {
        setCourseData(response.data)
      })
      .catch(e => {
        console.error(e)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  if (courseData.length === 1) return <div> Loading ... </div>
  else {
    return (
      <>
        <CustomNavbar />
        {courseData.map((courses: Course[]) => {
          return (
            <div key={courses[0].period} className='div-home'>
              <h3 className='subtitle-home'>
                {' '}
                {'Period ' + courses[0].period}
              </h3>
              <CardGroup>
                {courses.map((course: Course) => {
                  return (
                    <Card key={course._id} className='card-style-home mx-auto'>
                      <Card.Title>{course.code}</Card.Title>
                      <Card.Subtitle>{course.name}</Card.Subtitle>
                    </Card>
                  )
                })}
              </CardGroup>
            </div>
          )
        })}
      </>
    )
  }
}
