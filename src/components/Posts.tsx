import React from 'react'
import '../assets/styles/Post.css'
import { useSelector } from 'react-redux'
//import Latex from 'react-latex'

import MainPost from './MainPost'
export default function Posts() {
  //const lat = `$\\int_{-\\infty}^\\infty x^{2}$`
  const threadInfo = useSelector((state: any) => state.threadInformation)

  return (
    <div className='post'>
      <MainPost {...threadInfo.info} id={''} />
      {threadInfo.comments.map(comment => {
        comment.title = ''
        return <MainPost {...comment} id={comment._id} key={comment._id} />
      })}
    </div>
  )
}
