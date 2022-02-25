import { createContext, useReducer } from 'react'

import studentReducer from "./StudentReducer";

const StudentContext = createContext()

export const StudentProvider = ( {children} ) => {
    
    const initialState = {
        students: [],
        filterNameResults: [],
        nameFilterTrigger: false,
        filterTagResults: [],
        tagFilterTrigger: false,
    }

    const[state, dispatch] = useReducer(studentReducer, initialState)

    return <StudentContext.Provider value={{...state, dispatch}}>
                {children}
           </StudentContext.Provider>
}

export default StudentContext