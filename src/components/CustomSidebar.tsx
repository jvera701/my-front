import React, { useEffect, useState } from 'react'
import ThreadSidebar from './ThreadSidebar'
import Form from 'react-bootstrap/Form'
import '../assets/styles/Course.css'
import { InputGroup } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'
import customAxios from '../axios'
import { useSelector } from 'react-redux'

function msToTime(ms) {
  const seconds = ms / 1000
  const minutes = ms / (1000 * 60)
  const hours = ms / (1000 * 60 * 60)
  const days = ms / (1000 * 60 * 60 * 24)
  if (seconds < 60) return seconds.toFixed(0) + ' s'
  else if (minutes < 60) return minutes.toFixed(0) + ' m'
  else if (hours < 24) return hours.toFixed(0) + ' h'
  else return days.toFixed(0) + ' d'
}

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

const CustomSidebar = () => {
  const [pinnedCourses, setPinnedCourses] = useState<TCourseSidebar>([])
  const [courses, setCourses] = useState<TCourseSidebar>([])
  const [search, setSearch] = useState('')
  const course = useSelector((state: any) => state.course)

  async function setData() {
    const resp: any = await customAxios({
      url: customAxios.defaults.baseURL + '/' + course,
      method: 'get',
    })
    setPinnedCourses(resp.data.pinned)
    setCourses(resp.data.notPinned)
  }

  async function requestSearch() {
    const answer: any = await customAxios({
      url: customAxios.defaults.baseURL + '/thread/search',
      method: 'post',
      data: {
        courseId: course,
        toSearch: search,
      },
    })
    setCourses(answer.data)
  }

  function updateSearch(e) {
    e.preventDefault()
    setSearch(e.target.value)
  }

  function handleKeypress(e) {
    e.preventDefault()
    if (e.keyCode === 13) {
      console.log('search: ' + search)
      requestSearch()
    }
  }

  useEffect(() => {
    setData()
  }, [])

  return (
    <div className='sidebar' onKeyUp={handleKeypress}>
      <InputGroup>
        <InputGroup.Text>
          <Search />
        </InputGroup.Text>
        <Form.Control
          placeholder='Search'
          onChange={e => updateSearch(e)}
          onSubmit={e => handleKeypress(e)}
        />
      </InputGroup>
      {courses.length > 0
        ? courses.map(course => {
            const obj2 = {
              title: course.title,
              score: course.score,
              category: course.category,
              time: msToTime(
                new Date().getTime() - new Date(course.createdAt).getTime()
              ),
              replies: course.replies,
              name: course.userId.name,
              pinned: false,
              _id: course._id,
            }
            return <ThreadSidebar key={course._id} {...obj2} />
          })
        : ''}
    </div>
  )
}

export default CustomSidebar
