import { useContext, useState, useEffect } from 'react'

import StudentContext from '../../context/StudentContext'
import StudentItem from './StudentItem'

function StudentResult() {

    const { students, filterNameResults, nameFilterTrigger, filterTagResults,  tagFilterTrigger } = useContext(StudentContext)

    const [mergedFilters, setMergedFilters] = useState([])

    useEffect(() => {
      // Filter when searching both name and tag at the same time
      if(nameFilterTrigger && tagFilterTrigger){
        if(filterNameResults.length === 0 || filterTagResults.length === 0){
          setMergedFilters([])
        }else{
          const results = filterNameResults.filter(nameResult => {
            let same = []
            filterTagResults.forEach(tagResult => {
              if(tagResult.id === nameResult.id){
                same.push(tagResult)
              }
            });
            return same.length > 0
          })
          setMergedFilters(results)
        }
      }else if(nameFilterTrigger) {
        setMergedFilters(filterNameResults)
      }else if(tagFilterTrigger) {
        setMergedFilters(filterTagResults)
      }else {
        setMergedFilters(students)
      }
    }, [filterNameResults, filterTagResults, nameFilterTrigger, students, tagFilterTrigger])

  return (
    <div>
      {mergedFilters.map((student) => 
        <StudentItem key={student.id} student={student} />
      )}
    </div>
  )
}

export default StudentResult