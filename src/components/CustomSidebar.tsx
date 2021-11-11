import React, { useEffect, useState } from 'react'
import ThreadSidebar from './ThreadSidebar'
import Form from 'react-bootstrap/Form'
import '../assets/styles/Course.css'
import { InputGroup } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'
import customAxios from '../axios'
import { useSelector } from 'react-redux'
import { msToTime } from './Posts'

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
              time: msToTime(course.createdAt),
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
