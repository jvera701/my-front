import React, { useEffect, useState } from 'react'

import { initializeApp } from 'firebase/app'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'
import CustomNavbar from '../components/CustomNavbar'
import '../assets/styles/CourseFiles.css'
import Spinner from '../components/Spinner'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const {
  REACT_APP_apiKey,
  REACT_APP_authDomain,
  REACT_APP_projectId,
  REACT_APP_storageBucket,
  REACT_APP_messagingSenderId,
  REACT_APP_appId,
} = process.env

interface ICourseFiles {
  name: string
  reference: string
}

export default function CourseFiles() {
  const [files, setFiles] = useState<ICourseFiles[]>([])
  const course = useSelector((state: any) => state.course)
  const [loaded, setLoaded] = useState(false)
  const history = useHistory()

  const firebaseConfig = {
    apiKey: REACT_APP_apiKey,
    authDomain: REACT_APP_authDomain,
    projectId: REACT_APP_projectId,
    storageBucket: REACT_APP_storageBucket,
    messagingSenderId: REACT_APP_messagingSenderId,
    appId: REACT_APP_appId,
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const storage = getStorage(app)
  const listRef = ref(storage, course)

  async function setup() {
    try {
      setLoaded(false)
      const res: any = await listAll(listRef)
      const array: ICourseFiles[] = []

      for (let i = 0; i < res.items.length; i++) {
        const fileName = res.items[i]._location.path_.split(
          '617ec8fe69bb78520d65daae/'
        )[1]
        const url = await getDownloadURL(
          ref(storage, res.items[i]._location.path_)
        )
        array.push({ name: fileName, reference: url })
      }
      setFiles(array)
      setLoaded(true)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    setup()
  }, [])

  if (!loaded) return <Spinner />

  return (
    <>
      <CustomNavbar showFiles={true} />
      <div className='CourseFiles-title'> Course Files </div>
      <div className='CourseFiles-content'>
        {files.map(file => {
          return (
            <ul key={file.name}>
              <a key={file.name} href={file.reference}>
                {' '}
                {file.name}{' '}
              </a>
            </ul>
          )
        })}
        <Button
          type='button'
          onClick={() => {
            history.push('/home/' + course)
          }}
        >
          Go back
        </Button>
      </div>
    </>
  )
}
