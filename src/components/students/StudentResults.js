
export const getStudents = async () => {
    
    const STUDENTS_URL = process.env.REACT_APP_HATCHWAY_URL

    try {
        let response = await fetch(STUDENTS_URL)

        let data = await response.json()

        return data

    } catch (error) {
        console.log(error)
    }
}