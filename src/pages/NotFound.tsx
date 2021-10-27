import React from 'react'
import '../assets/styles/NotFound.css'
import Broken from '../assets/Images/broken.jpg'

export default function NotFound() {
  return (
    <section className="section-notFound">
      <h1 className="title-notFound"> Oops! </h1>
      <p className="text-notFound">
        We are sorry! The page you are looking for does not exist
      </p>
      <img src={Broken} alt="not found" />
    </section>
  )
}
