import {useContext, useEffect, useRef} from 'react'

import { fetchStudentsData } from '../../context/StudentAction'
import StudentContext from '../../context/StudentContext'

function StudentSearch() {

    const { students, dispatch } = useContext(StudentContext)

    const nameRef = useRef(null)
    const tagRef = useRef(null)

    useEffect(() => {
      // Retrieve all students data when loading
      const getStudentsData = async () => {
        const studentData = await fetchStudentsData()
        addToggleAndTags(studentData)
        dispatch({
          type: 'SET_STUDENTS',
          payload: studentData
        })
      }

      getStudentsData()
      
    }, [dispatch])

    // Inject toggle and tag fields to students data
    // And return modified students data
    const addToggleAndTags = (studentData) => {
      studentData.map((student) => {
        student.isToggle = false
        student.tags = []
        return student
      })
    }

    // Filter student list based on name input
    const searchName = (name) => {
      if(name !== ''){
        const results = students.filter((student) => {
          let fullName = (student.firstName).toLowerCase() + (student.lastName).toLowerCase()
          return fullName.includes(name)
        })
        dispatch({
          type: 'FILTER_NAMES',
          payload: {
            nameResults: results,
            triggerNameFilter: true,
          },
        })
      }else{
        dispatch({
          type: 'FILTER_NAMES',
          payload: {
            nameResults: [],
            triggerNameFilter: false,
          },
        })
      }
    }

    // Filter student list based on tag input
    const searchTag = (tagName) => {
      if(tagName !== ''){
        let lowerTagName = tagName.trim().toLowerCase()
        const results = students.filter(student => {
          let stuWithTags = []
          student.tags.forEach(tag => {
            if(tag.trim().toLowerCase().includes(lowerTagName)) {
              stuWithTags.push(student)
            }
          })
          return stuWithTags.length > 0
        })
        dispatch({
          type: 'FILTER_TAGS',
          payload: {
            tagResults: results,
            triggerTagFilter: true,
          },
        })
      }else{
        dispatch({
          type: 'FILTER_TAGS',
          payload: {
            tagResults: [],
            triggerTagFilter: false,
          },
        })
      }
    }

    // Call search functions whenever
    // name or input values change
    const handleChange = (e) => {
      e.preventDefault()
      let inputName = e.target.name

      if(inputName === 'name') {
        searchName(nameRef.current.value)
      }
      if(inputName === 'tag'){
        searchTag(tagRef.current.value)
      }
    }

    return (
        <div className='mb-3'>
          <input className='filter-inputs border-0 p-2 border-bottom' type='text' ref={nameRef} onChange={handleChange} name='name' placeholder="Search by name" />
          <input className='filter-inputs border-0 p-2 border-bottom' type='text' ref={tagRef} onChange={handleChange} name='tag' placeholder="Search by tag" />
        </div>
    )
}

export default StudentSearch