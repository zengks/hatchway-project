import {useContext} from 'react'
import StudentContext from '../context/StudentContext'

function ToggleBtn({studentId, isToggle}) {

    const { students, dispatch } = useContext(StudentContext)

    let curStudents = students

    const onToggle = () => {
        curStudents.map((student) => {
            if(student.id === studentId) {
                student.isToggle = !student.isToggle
            }
            return student
        })

        dispatch({
            type: "SET_STUDENTS",
            payload: curStudents,
        })
    }

    return (
        <button className='toggleBtn' type='button' onClick={onToggle}>
            <div className='horizontal'></div>
            <div className={isToggle ? `invisible` : `vertical`}></div>
        </button>
    )
}

export default ToggleBtn