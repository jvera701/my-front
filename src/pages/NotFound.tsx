import React from 'react'
import '../assets/styles/NotFound.css'
import Broken from '../assets/Images/broken.jpg'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { AUTHENTICATED } from '../store/actions'

export default function NotFound() {
  const status = useSelector((state: any) => state.status)
  const ref = status === AUTHENTICATED ? '/home' : '/'
  return (
    <section className='section-notFound'>
      <h1 className='title-notFound'> Oops! </h1>
      <p className='text-notFound'>
        We are sorry! The page you are looking for does not exist
      </p>
      <img src={Broken} alt='not found' />
      <Button variant='post' size='lg' href={ref}>
        {' '}
        Go back{' '}
      </Button>
    </section>
  )
}
