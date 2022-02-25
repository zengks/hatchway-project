
// Get students
export const fetchStudentsData = async () => {
    
    const STUDENTS_URL = process.env.REACT_APP_HATCHWAY_URL

    try {
        const response = await fetch(STUDENTS_URL, {mode: 'cors'})

        const data = await response.json()

        return data.students

    } catch (error) {
        console.log(error)
    }
}