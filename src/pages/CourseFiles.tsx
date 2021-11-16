import React, { useEffect, useState } from 'react'

import { initializeApp } from 'firebase/app'
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
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
  const [selectedFile, setSelectedFile] = useState<any>()
  const [isFilePicked, setIsFilePicked] = useState(false)
  const [arrCheck, setArrCheck] = useState<boolean[]>([])
  const course = useSelector((state: any) => state.course)
  const role = useSelector((state: any) => state.user.role)
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
  const listRef = ref(storage, course + '/')

  async function setup() {
    try {
      setLoaded(false)
      const res: any = await listAll(listRef)
      const array: ICourseFiles[] = []

      for (let i = 0; i < res.items.length; i++) {
        const fileName = res.items[i]._location.path_.split(course + '/')[1]
        const url = await getDownloadURL(
          ref(storage, res.items[i]._location.path_)
        )
        array.push({ name: fileName, reference: url })
      }
      setFiles(array)
      const booleanArr: boolean[] = []
      for (let i = 0; i < array.length; i++) {
        booleanArr.push(false)
      }
      setArrCheck(booleanArr)
      setLoaded(true)
    } catch (e) {
      console.error(e)
    }
  }

  function changeHandler(event) {
    setSelectedFile(event.target.files[0])
    setIsFilePicked(true)
  }

  function handleChange(position) {
    const updateState = arrCheck.map((item, index) =>
      index === position ? !item : item
    )
    setArrCheck(updateState)
  }

  async function handleDeletion() {
    for (let i = 0; i < arrCheck.length; i++) {
      if (arrCheck[i]) {
        const desertRef = ref(storage, course + '/' + files[i].name)
        await deleteObject(desertRef)
        setup()
      }
    }
  }

  async function handleSubmission() {
    if (isFilePicked) {
      try {
        const newRef = ref(storage, course + '/' + selectedFile.name)
        await uploadBytes(newRef, selectedFile)
        setup()
      } catch (e) {
        console.error(e)
      }
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
        {files.map((file, i) => {
          return (
            <>
              <ul key={file.name} className='CourseFiles-file'>
                {role === 'admin' ? (
                  <div key={file.name} className='CourseFiles-checkbox'>
                    <input
                      type='checkbox'
                      checked={arrCheck[i]}
                      onChange={() => handleChange(i)}
                    />
                  </div>
                ) : (
                  ''
                )}

                <a key={file.name} href={file.reference}>
                  {' '}
                  {file.name}{' '}
                </a>
              </ul>
            </>
          )
        })}

        <div>
          {role === 'admin' ? (
            <>
              <input type='file' name='file' onChange={changeHandler} />
              <Button onClick={handleSubmission} variant='post'>
                Upload file
              </Button>
              <Button onClick={handleDeletion} variant='post'>
                {' '}
                Delete{' '}
              </Button>
            </>
          ) : (
            ''
          )}
          <Button
            type='button'
            onClick={() => {
              history.push('/home/' + course)
            }}
            variant='post'
          >
            Go back
          </Button>
        </div>
      </div>
    </>
  )
}
