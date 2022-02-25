import PropTypes from 'prop-types'

function StudentGrades({ grades, studentId }) {
    return (
        <div className='mt-5 mb-1'>
            {grades.map((grade, index) => (
                <div key={studentId} className='d-flex justify-content-start'>
                    <p>Test {index+1}</p> 
                    <p className='ms-5'>{grade}%</p>
                </div>
            ))}
        </div>
        )
}

StudentGrades.propTypes = {
    grades: PropTypes.array.isRequired
}

export default StudentGrades