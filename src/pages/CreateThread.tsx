import React from 'react'
import CustomNavbar from '../components/CustomNavbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../assets/styles/CreateThread.css'
import customAxios from '../axios'

export default function CreateThread() {
  const course = useSelector((state: any) => state.course)
  const email = useSelector((state: any) => state.user.email)
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [arrOptions, setArrOptions] = useState([true, false, false])
  const [validated, setValidated] = useState(false)

  function updateTitle(e) {
    e.preventDefault()
    setTitle(e.target.value)
  }

  function updateContent(e) {
    e.preventDefault()
    setContent(e.target.value)
  }

  function updateArr(index: number) {
    const newArr: Array<boolean> = [false, false, false]
    for (let i = 0; i < 3; i++) {
      if (index === i) {
        newArr[i] = !arrOptions[i]
      }
    }
    setArrOptions(newArr)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
    } else {
      let category = 'Quizzes'
      if (arrOptions[0]) category = 'General'
      else if (arrOptions[1]) category = 'Lectures'

      await customAxios({
        url: customAxios.defaults.baseURL + '/thread/create',
        method: 'post',
        data: {
          title: title,
          content: content,
          category: category,
          photos: [],
          courseId: course,
          email: email,
        },
      })
      history.push('/home/' + course)
    }
  }

  return (
    <>
      <CustomNavbar />
      <div className='create-thread'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Thread title </Form.Label>
            <Form.Control required size='lg' onChange={updateTitle} />
            <Form.Control.Feedback type='invalid'>
              Please enter a title
            </Form.Control.Feedback>

            <Form.Label>Thread content</Form.Label>
            <Form.Control
              required
              as='textarea'
              rows={3}
              size='lg'
              onChange={updateContent}
            />
            <Form.Control.Feedback type='invalid'>
              Please enter content
            </Form.Control.Feedback>
          </Form.Group>
          <div className='mb-3'>
            <Form.Check
              inline
              label='General'
              name='group1'
              type='radio'
              checked={arrOptions[0]}
              onChange={() => updateArr(0)}
            />
            <Form.Check
              inline
              label='Lectures'
              name='group1'
              type='radio'
              checked={arrOptions[1]}
              onChange={() => updateArr(1)}
            />
            <Form.Check
              inline
              label='Quizzes'
              name='group1'
              type='radio'
              checked={arrOptions[2]}
              onChange={() => updateArr(2)}
            />
          </div>
          <Button type='submit'>Submit</Button>
          <Button
            type='button'
            onClick={() => {
              history.push('/home/' + course)
            }}
          >
            Go back
          </Button>
        </Form>
      </div>
    </>
  )
}
