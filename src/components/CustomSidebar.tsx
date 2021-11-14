import React, { useEffect, useState } from 'react'
import ThreadSidebar from './ThreadSidebar'
import Form from 'react-bootstrap/Form'
import '../assets/styles/Course.css'
import '../assets/styles/LeftSidebar.css'
import { InputGroup, Button } from 'react-bootstrap'
import { PencilSquare } from 'react-bootstrap-icons'
import { Search } from 'react-bootstrap-icons'
import customAxios from '../axios'
import { useSelector } from 'react-redux'
import { msToTime } from './Posts'
import { useHistory } from 'react-router-dom'

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

function CustomSidebar() {
  const [pinnedCourses, setPinnedCourses] = useState<TCourseSidebar>([])
  const [courses, setCourses] = useState<TCourseSidebar>([])
  const [search, setSearch] = useState('')
  const course = useSelector((state: any) => state.course)
  const history = useHistory()

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

  async function requestFilter(filter) {
    const answer: any = await customAxios({
      url: customAxios.defaults.baseURL + '/thread/filter',
      method: 'post',
      data: {
        courseId: course,
        toFilter: filter,
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
    <>
      <div className='left-sidebar'>
        <Button
          variant='post'
          size='sm'
          onClick={() => history.push('/home/' + course + '/createThread')}
        >
          <PencilSquare /> New Thread
        </Button>
        <div className='title-left-sidebar'> Courses</div>
        <div className='courses-left-sidebar'>
          <div className='course-link-sidebar'>Math </div>
          <div className='course-link-sidebar'>Comp </div>
          <div className='course-link-sidebar'>Comp123 </div>
        </div>
        <div className='title-left-sidebar'>Categories</div>
        <div>
          <div
            className='category-left-sidebar'
            onClick={() => requestFilter('General')}
          >
            <div className='square general'> </div>
            General
          </div>
          <div
            className='category-left-sidebar'
            onClick={() => requestFilter('Lectures')}
          >
            <div className='square lectures'> </div>
            Lectures
          </div>
          <div
            className='category-left-sidebar'
            onClick={() => requestFilter('Quizzes')}
          >
            <div className='square quizzes'> </div>
            Quizzes
          </div>
        </div>
      </div>
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
    </>
  )
}

export default CustomSidebar
