import { useEffect, useState, useRef, useContext } from 'react'

import { getStudents } from './components/students/StudentResults'
// import StudentGrades from './components/students/StudentGrades'

import StudentResult from './components/students/StudentResult'
import StudentSearch from './components/students/StudentSearch'
import { fetchStudentsData } from './context/StudentAction'
import StudentContext from './context/StudentContext'

function App() {

  // const { students, dispatch } = useContext(StudentContext)

  const[students, setStudents] = useState([])
  const[filteredStudents, setFilteredStudents] = useState([])
  const[found, setFound] = useState(false)
  
  const searchNameRef = useRef(null)
  const searchTagRef = useRef(null)

  useEffect(() => {
    getStudents()
      .then(data => {
        console.log(data)
        let modifiedStudents = data.students
        modifiedStudents.forEach(student => {
          student.isToggled = false
          student.tags = []
        });
        setStudents(modifiedStudents)

        // const getStudentsData = async () => {
        //   const studentsData = await fetchStudentsData()
        //   dispatch({
        //     type: 'GET_STUDENTS',
        //     payload: studentsData.students
        //   })
        // }
      })
      .catch(error => console.log(error))
  }, [])

  const gradeAverage = (grades) => {
    let newGrade = []

    grades.forEach(grade => {
      newGrade.push(parseInt(grade))
    });

    let result = newGrade.reduce((a,b) => a+b) / newGrade.length

    return result
  }

  const searchName = (name) => {
    let studentsFound = []

    students.forEach(student => {

      let lowerFirst = (student.firstName).toLowerCase()
      let lowerLast = (student.lastName).toLowerCase()

      if(lowerFirst.includes(name) || lowerLast.includes(name)) {
        studentsFound.push(student)
      }
    })

    if(studentsFound === null) {
      setFound(false)
      setFilteredStudents([])
    }else{
      setFound(true)
      setFilteredStudents(studentsFound)
    }
  }

  const onToggle = (id) => {
    let cur = students
    cur.map((student) => {
      if(student.id === id) {
        student.isToggled = !student.isToggled
      }
      return student
    })
    setStudents([...cur])
  }

  const addTag = (id, e) => {
    e.preventDefault()
    let newTag = e.target.tag.value.trim()

    if(newTag.length === 0) {
      e.target.tag.value = ''
      return
    }

    let cur = students
    cur.map((student) => {
      if(student.id === id && !student.tags.includes(newTag)) {
        student.tags.push(newTag)
      }
      return student
    })
    setStudents([...cur])
    e.target.tag.value = ''
  }

  const searchTag = (tagName) => {
    let studentsFound = []

    students.forEach(student => {
      student.tags.forEach((tag) => {
        if(tag.includes(tagName)) {
          studentsFound.push(student)
        }
      })
    })

    if(studentsFound === null) {
      setFound(false)
    }else{
      setFound(true)
      setFilteredStudents(studentsFound)
    }
  }

  const searchBothTagAndName = (studentName, tagName) => {
    let studentsFound = []

    students.forEach(student => {
      
      let fullName = (student.firstName).toLowerCase() + (student.lastName).toLowerCase()      

      if(fullName.includes(studentName)){
        student.tags.forEach((tag) => {
          if(tag.includes(tagName)) {
            studentsFound.push(student)
          }
        })
      }
    })

    if(studentsFound === null) {
      setFound(false)
    }else{
      setFound(true)
      setFilteredStudents(studentsFound)
    }
  }

  const tagAndName = () => {
    let nameRef = searchNameRef.current.value.trim().toLowerCase()
    let tagRef = searchTagRef.current.value.trim().toLowerCase()

    if(nameRef && tagRef) {
      searchBothTagAndName(nameRef, tagRef)
    } else if(nameRef) {
      searchName(nameRef)
    } else if(tagRef){
      searchTag(tagRef)
    } else {
      setFound(false)
    }
  }

  return (
    <>
      <div className='container bg-white border rounded-3'  style={{ width: '80%', margin: "5rem auto" }}>
        <div className=' mb-3'>
          <input className='border-0 p-2 border-bottom' style={{ width: "100%", fontSize: '1.5rem' }} type='text' ref={searchNameRef} onChange={tagAndName} placeholder="Search by name" />

          <input className='border-0 p-2 border-bottom' style={{ width: "100%", fontSize: '1.5rem' }} type='text' ref={searchTagRef} onChange={tagAndName} placeholder="Search by tag" />
        </div>

        {(found ? filteredStudents : students).map((student, index) => 
          <div key={index} className="mt-4 d-flex justify-content-between border-bottom">
            <div className='d-flex justify-content-start'>
                <div className='ms-4'>
                  <img className='rounded-circle border border-2' src={student.pic} alt={`${student.id}'s profile`} />
                </div>

                <div className='ms-5'>
                  <p className='display-4 card-title text-uppercase'><strong>{`${student.firstName} ${student.lastName}`}</strong></p>
                  <div className='card-body'>
                    <p>Email: {student.email}</p>
                    <p>Company: {student.company}</p>
                    <p>Skill: {student.skill}</p>
                    <p>Average: {gradeAverage(student.grades)}%</p>

                    <div className={student.isToggled ? `mt-5 mb-1` : `mt-5 hideDiv`}>
                      {student.grades.map((grade, index) => (
                        <div className='d-flex justify-content-start'>
                          <p>Test {index+1}</p>
                          <p className='ms-5'>{grade}%</p>
                        </div>
                      ))}
                    </div>

                    <div className='d-flex flex-wrap justify-content-start'>
                      {student.tags.map((tag, index) => (
                          <div key={index} className="mt-3 mb-4">
                            <span className='tag'>{tag}</span>
                          </div>
                      ))}
                    </div>

                    <div>
                      <form onSubmit={(e) => addTag(student.id, e)}>
                        <input className='border-0 p-2 mb-4 border-bottom tagInput' style={{ width: "40%", fontSize: '1.2rem' }} type='text' name='tag'  placeholder="Add a tag" />
                      </form>
                    </div>
                  </div>

                  
                </div>                
            </div>

            <button className='toggleBtn' type='button' onClick={() => onToggle(student.id)}>
              <div className='horizontal'></div>
              <div className={student.isToggled ? `invisible` : `vertical`}></div>
            </button>
          </div>
        )}
      </div>

    </>
  );
}

export default App;
