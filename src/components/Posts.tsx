import React from 'react'
import '../assets/styles/Post.css'
import { useSelector } from 'react-redux'
import Latex from 'react-latex'
import Button from 'react-bootstrap/Button'

import { ArrowDownCircle, ArrowUpCircle, Person } from 'react-bootstrap-icons'
import MainPost from './MainPost'
export default function Posts() {
  //const lat = `$\\int_{-\\infty}^\\infty x^{2}$`
  const threadInfo = useSelector((state: any) => state.threadInformation)

  return (
    <div className='post'>
      <MainPost {...threadInfo.info} />
      {threadInfo.comments.map(comment => {
        comment.title = ''
        return <MainPost {...comment} key={comment._id} />
      })}
    </div>
  )
}
