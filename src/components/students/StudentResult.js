import { useContext, useState, useEffect} from 'react'

import StudentContext from '../../context/StudentContext'
import StudentItem from './StudentItem'

function StudentResult() {

    const { students, filterNameResults, nameFilterTrigger, filterTagResults,  tagFilterTrigger } = useContext(StudentContext)

    const [mergedFilters, setMergedFilters] = useState([])

    useEffect(() => {
      if((nameFilterTrigger && tagFilterTrigger) && (filterNameResults.length === 0 || filterTagResults.length === 0)) {
        setMergedFilters([])
      }else {
        setMergedFilters([...new Set([...filterNameResults, ...filterTagResults])])
      }
    }, [filterNameResults, filterTagResults, nameFilterTrigger, tagFilterTrigger])

  return (
    <div>
        {((nameFilterTrigger || tagFilterTrigger) ? mergedFilters : students).map((student) => 
            <StudentItem key={student.id} student={student} />
        )}
    </div>
  )
}

export default StudentResult