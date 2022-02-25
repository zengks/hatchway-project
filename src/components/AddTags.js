import {useContext} from 'react'
import StudentContext from '../context/StudentContext'

function AddTags({ studentId }) {

    const { students, dispatch } = useContext(StudentContext)

    const onSubmit = (e) => {
        e.preventDefault()

        // Add tags to a student
        let newTag = e.target.tag.value.trim()

        if(newTag.length === 0) {
            e.target.tag.value = ''
            return
        }

        let cur = students

        cur.map((student) => {
        if(student.id === studentId && !student.tags.includes(newTag)) {
            student.tags.push(newTag)
        }
        return student
        })
        
        dispatch({
            type: 'SET_STUDENTS',
            payload: cur
        })

        e.target.tag.value = ''
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input className='border-0 p-2 mb-4 border-bottom tagInput' style={{ width: "40%", fontSize: '1.2rem' }} type='text' name='tag'  placeholder="Add a tag" />
            </form>
        </div>
    )
}

export default AddTags