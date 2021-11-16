import React, { useEffect, useState } from 'react'
import ThreadSidebar from './ThreadSidebar'
import Form from 'react-bootstrap/Form'
import '../assets/styles/Course.css'
import '../assets/styles/LeftSidebar.css'
import { InputGroup, Button } from 'react-bootstrap'
import { PencilSquare } from 'react-bootstrap-icons'
import { Search } from 'react-bootstrap-icons'
import customAxios from '../axios'
import { useSelector, useDispatch } from 'react-redux'
import { msToTime } from './Posts'
import { useHistory } from 'react-router-dom'
import { putCourse, clearThread } from '../store/actionCreators'
import Spinner from '../components/Spinner'

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
  const [loaded, setLoaded] = useState(false)
  const course = useSelector((state: any) => state.course)
  const coursesInfo = useSelector((state: any) => state.coursesInformation)
  const history = useHistory()
  const dispatch = useDispatch()

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

  function handleClickSidebar(customCourse) {
    history.push('/home/' + customCourse._id)
    dispatch(putCourse(customCourse._id))
    dispatch(clearThread())
    setData(customCourse._id)
  }

  useEffect(() => {
    setData(course)
  }, [])

  if (!loaded) return <Spinner />

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
          {coursesInfo.map(course => {
            return (
              <div
                className='course-link-sidebar'
                key={course._id}
                onClick={() => handleClickSidebar(course)}
              >
                {course.code}
              </div>
            )
          })}
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
        <div className='search-sidebar'>
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
        </div>
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
