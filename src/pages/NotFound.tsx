import React from 'react'
import '../assets/styles/NotFound.css'
import Broken from '../assets/Images/broken.jpg'
import { Button } from 'react-bootstrap'

export default function NotFound() {
  const route = '/'
  return (
    <section className='section-notFound'>
      <h1 className='title-notFound'> Oops! </h1>
      <p className='text-notFound'>
        We are sorry! The page you are looking for does not exist
      </p>
      <img src={Broken} alt='not found' />
      <Button variant='primary' size='lg' href={route}>
        {' '}
        Go back{' '}
      </Button>
    </section>
  )
}
