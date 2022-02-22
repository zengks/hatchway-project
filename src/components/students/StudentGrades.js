import React from 'react'

function StudentGrades({ grades }) {
    return (
        <div className='mt-5'>
            {grades.map((grade, index) => (
                <div key={index} className='d-flex justify-content-start'>
                    <p>Test {index+1}</p> 
                    <p className='ms-5'>{grade}%</p>
                </div>
            ))}
        </div>
        )
}

export default StudentGrades