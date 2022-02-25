import PropTypes from 'prop-types'

import StudentGrades from './StudentGrades';
import AddTags from '../AddTags';
import DisplayTags from '../DisplayTags'
import ToggleBtn from '../ToggleBtn';

function StudentItem( {student: {pic, id, lastName, firstName, email, company, skill, grades, tags, isToggle}} ) {

    // Calculate grades average and return result
    const gradeAverage = (grades) => {
        let newGrade = []

        grades.forEach(grade => {
            newGrade.push(parseInt(grade))
        });

        let result = newGrade.reduce((a,b) => a+b) / newGrade.length

        return result
    }

  return (
    <div className='d-flex justify-content-between border-bottom mt-4'>
        <div className='d-flex justify-content-start'>
            <div className='ms-4'>
                <img className='rounded-circle border border-2' src={pic} alt={`${id}'s student profile`} />
            </div>

            <div className='ms-5'>
                <p className='display-4 card-title text-uppercase'><strong>{`${firstName} ${lastName}`}</strong>
                </p>

                <div className='card-body'>
                    <p>Email: {email}</p>
                    <p>Company: {company}</p>
                    <p>Skill: {skill}</p>
                    <p>Average: {gradeAverage(grades)}%</p>

                    {isToggle && (
                        <div className='mt-5 mb-1'>
                            <StudentGrades grades={grades} studentId={id} />
                        </div>
                    )}
                </div>

                {tags.length > 0 && (
                    <div className='d-flex flex-wrap'>
                        <DisplayTags tags={tags} />
                    </div>
                )}

                <AddTags studentId={id} />

            </div>
        </div>

        <ToggleBtn studentId={id} isToggle={isToggle} />
        
    </div>
  )
}

StudentItem.propTypes = {
    student: PropTypes.object.isRequired
}

export default StudentItem