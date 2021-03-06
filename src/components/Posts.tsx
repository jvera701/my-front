import React from 'react'
import '../assets/styles/Post.css'
import { useSelector } from 'react-redux'
import MainPost from './MainPost'

export function msToTime(time) {
  const ms = new Date().getTime() - new Date(time).getTime()
  const seconds = ms / 1000
  const minutes = ms / (1000 * 60)
  const hours = ms / (1000 * 60 * 60)
  const days = ms / (1000 * 60 * 60 * 24)
  if (seconds < 60) return seconds.toFixed(0) + ' s'
  else if (minutes < 60) return minutes.toFixed(0) + ' m'
  else if (hours < 24) return hours.toFixed(0) + ' h'
  else return days.toFixed(0) + ' d'
}
export default function Posts() {
  const threadInfo = useSelector((state: any) => state.threadInformation)
  const message = threadInfo.info.isEdited ? 'edited' : ''

  if (threadInfo._id === '') {
    return <div className='post'></div>
  } else {
    return (
      <div className='post'>
        <MainPost {...threadInfo.info} id={''} message={message} />
        {threadInfo.comments.map(comment => {
          comment.title = ''
          const innerMessage = comment.isEdited ? 'edited' : ''
          return (
            <MainPost
              {...comment}
              id={comment._id}
              key={comment._id}
              message={innerMessage}
            />
          )
        })}
      </div>
    )
  }
}
